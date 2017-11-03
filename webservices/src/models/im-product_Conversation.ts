import ProductModel from './product-model';
import ParticipantModel from './im-product_Participant'
import ChatMessageModel from './im-product_ChatMessage'
import { normalizeAppName, createConversationName } from './im-product'

export default class ConversationModel {
    protected id: string;
    protected name: string;
    protected appName: string;
    protected chat: ChatMessageModel[];
    protected participants: ParticipantModel[];
    protected groupId: string;

    static fromData(data: any) {
        let product = new ConversationModel();

        ProductModel._fromData(product, data);

        product.appName = normalizeAppName(data.app_name);

        product.participants = data.participants instanceof Array
            ? data.participants.map(sourceParti => {
                let destParti = ParticipantModel.fromData(sourceParti);

                return destParti;
            })
            : null;
        product.chat = data.chat instanceof Array
            ? data.chat.map(sourceMessage => {

                let destMessage = ChatMessageModel.fromData(sourceMessage, {
                    topicId: product.id,
                    participants: product.participants
                })

                return destMessage;
            })
            : null;

        product.chat.sort((a, b) => {
                const timestampA = ChatMessageModel.getTimestamp(a);
                const timestampB = ChatMessageModel.getTimestamp(b);

                return timestampA - timestampB;
            }
        )

        product.groupId = data.group || data.group_id;

        product.name = createConversationName(product);

        return product;
    }
}