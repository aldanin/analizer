import ProductModel from './product-model';
import ParticipantModel from './im-product_Participant'
import { normalizeAppName, dateStringToNumber, ConversationOptions } from './im-product'

export default class ChatMessageModel extends ProductModel {
    protected appName: string;
    protected body: string;
    protected direction: string; // IMCommon.Direction;
    protected from: ParticipantModel;
    protected to: ParticipantModel[];
    protected timestamp: number;
    protected attachments: string[];
    protected topicId: string;

    static fromData(data: any, options: ConversationOptions) {
        let product = new ChatMessageModel();

        ProductModel._fromData(product, data);

        product.appName = normalizeAppName(data.app_name);
        product.body = data.body;
        product.direction = data.direction;
        //
        // It may happen that the from id is not found in this conversation's participant list.
        // In this case we produce an artificial participant as to not brake the data structure.
        // We do the same for the 'to's:
        //
        product.from = options.participants
            ? (options.participants.filter(parti => parti.getId() === data.from)[0] || null)
            : null;
        //
        // No participant found for the supplied id. As stated above, we create one on the fly:
        //
        product.from = product.from || ParticipantModel.createBasicParticipant(data.from);
        //
        // The 'to' part of a chat message will always be an array, for convenience:
        //
        const toPartiArray = data.to instanceof Array
            ? data.to
            : (
                data.to
                    ? [data.to]
                    : []
            );
        product.to = options.participants
            ? toPartiArray.map(pratiId => {
                return (options.participants.filter(
                    parti => parti.getId() === pratiId)[0] || ParticipantModel.createBasicParticipant(pratiId))
            })
            : [];
        product.timestamp = dateStringToNumber(data.timestamp);
        product.attachments = data.attachment ? [data.attachment] : null;
        product.topicId = options.topicId;

        return product;
    }

    static getTimestamp( product: ChatMessageModel) {
        return product.timestamp;
    }
}