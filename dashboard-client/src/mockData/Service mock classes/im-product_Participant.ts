// import ProductModel from './product-model';
import { normalizeAppName } from './im-product'

export default class ParticipantModel {
  protected id: string;
  protected name: string;
  protected appName: string;
  protected identifier: string;
  protected phoneNumber: string;
  protected address: {
    street?: string,
    city?: string,
    country?: string,
  };
  protected lastChat: number;
  protected lastModified: number;
  protected avatar: string;
  protected birthday: string;
  protected homepage: string;
  protected about: string;

  static fromData(data: any) {
    let product = new ParticipantModel();

    // ProductModel._fromData(product, data);
    product.id = data._id;
    product.name = data.name || null;
    product.appName = data.app_name ? normalizeAppName(data.app_name) : null;
    product.identifier = data.identifier || null;
    product.phoneNumber = data.details && data.details['phone number'] ? data.details['phone number'] : null;
    product.homepage = data.details && data.details.homepage ? data.details.homepage : null;
    product.about = data.details && data.details.about ? data.details.about : null;
    product.birthday = data.details && data.details.birthday ? data.details.birthday : null;
    product.address =
      data.details && (data.details.country || data.details.city || data.details.street)
        ? {
          street: data.details.street,
          city: data.details.city,
          country: data.country
        }
        : null;
    product.lastChat = data.details && data.details.last_online ? data.details.last_online : null;
    product.lastModified = data.last_modified || null;
    product.avatar = data.avatar;

    return Object.assign({}, product);
  }

  static createBasicParticipant(_id: string) {
    return ParticipantModel.fromData({_id: _id, name: _id, identifier: _id})
  }

  getId = () => {
    return this.id;
  }
}
