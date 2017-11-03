import ProductModel from './product-model';
import ParticipantModel from './im-product_Participant'
import ChatMessageModel from './im-product_ChatMessage'
import ConversationModel from './im-product_Conversation'
// import * as IMCommon from '../common/types/InstantMessaging'

export interface ConversationOptions {
    participants: ParticipantModel[];
    topicId: string;
}

class IMProduct {
    protected conversations: ConversationModel[];

    static fromData(data: any) {
        let product = new IMProduct();

        ProductModel._fromData(product, data);
        try {

            product.conversations = data.chatconversations instanceof Array
                ? data.chatconversations.map(conv => {

                    let conversation = ConversationModel.fromData(conv);

                    return conversation;
                })
                : null;
        } catch (err) {
            // tslint:disable
            console.log(err)
            // tslint:enable
        }

        return product;
    }
}

export default IMProduct;

export function dateStringToNumber(dateString: string): number {
    if (!dateString) {
        return null;
    } else {
        try {
            const date = new Date(dateString)

            return date.getTime();
        } catch (err) {
            throw new Error('unrecognizable date format');
        }
    }
}

export function normalizeAppName(origApp: string): string {
    let newApp;

    switch (origApp) {
        case 'hangout-gtalk':
            newApp = 'hangouts';
            break;
        default:
            newApp = origApp;
    }

    return newApp;
}

export function createConversationName(conversation): string {
    let name;
    if (!conversation.groupId) {
        name =
            conversation.chat &&
            conversation.chat.length &&
            conversation.chat[0].to &&
            conversation.chat[0].to.length
                ? (
                    conversation.chat[0].to[0].name.toLowerCase() === 'me'
                        //
                        // me means this target, meaning the first message was incoming ,
                        // so here we name after the 'from' :
                        //
                        ? conversation.chat[0].from.name
                        : conversation.chat[0].to[0].name
                )
                : 'NA'
        ;
    } else {

        name = conversation.participants
            ? conversation.participants.reduce((result, parti) => {
                return `${result}, ${parti.name}`;
            }, '')
            : '';
        name = name ? name.substring(1, name.length) : ''; // remove the first ';
    }
    return name;
}
