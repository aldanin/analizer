import ProductModel from './product-model';
import * as moment from 'moment'

class ContactProduct extends ProductModel {
    protected app: string;
    protected name: string;
    protected phoneHome: string;
    protected phoneWork: string;
    protected phoneMobile: string;
    protected email: string;
    protected address?: {
        street?: string,
        city?: string,
        country?: string,
    };
    protected avatar: string;
    protected details: string; // TODO: will go for status
    protected identifier: string;
    protected status: string;
    protected dateAdded: number;
    protected lastChat: number;
    protected lastOnline: number;
    protected birthday: number;


    static fromData(data: any) {
        let product = new ContactProduct();

        ProductModel._fromData(product, data);

        product.app = normalizeApp(data.app_name);
        product.name = data.name;
        product.phoneHome = data.details && data.details['phone number']
            ? data.details['phone number']
            : null;
        product.phoneWork = null;
        product.phoneMobile = null;
        product.email = null;
        product.address =
            data.details && (data.details.country || data.details.city || data.details.street)
                ? {
                    street: data.details.street || null,
                    city: data.details.city || null,
                    country: data.details.country || null,
                }
                : null;
        product.avatar = data.details && data.details.picture ? data.details.picture : null;
        product.identifier = data.identifier || null;
        product.details = data.details ? data.details.status : null;
        console.log('==>',data.details,data.name)
        product.status = data.details ? data.details.status : null;
        product.dateAdded = data.details && data.details['added timestamp']
            ? normalizeDate(data.details['added timestamp'])
            : null;
        product.lastChat = data.last_chat
            ? normalizeDate(data.last_chat)
            : null;
        product.lastOnline = data.details && data.details.last_online
            ? normalizeDate(data.details.last_online)
            : null;
        product.birthday = data.details && data.details.birthday
            ? birthdayToMS(data.details.birthday)
            : null;
        return product;
    }
}

export default ContactProduct;

function normalizeDate(data: any) {
    if (!data) {
        return null;
    }
    try {
        let date;

        if (data.replace) {
            const ar: number[] = data.split(/[\-:\s]/).map(chr => parseFloat(chr));

            date = new Date(ar[0], ar[1] - 1, ar[2], ar[3], ar[4], ar[5]).getTime();
        } else if (isNumeric(data)) {
            date = data;
        } else {
            throw new Error(`Illegal date format. Value: ${data}`)
        }

        return date;
    } catch (err) {
        console.log(`Error converting date. Input string: ${data}`)

        throw err;
    }
}

function isNumeric(val) {
    return Number(parseFloat(val)) == val;
}

function normalizeApp(origApp) {
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

function birthdayToMS(birthdayString: string) {
    if (!birthdayString || isNaN(parseInt(birthdayString)) || birthdayString.length !== 8) {
        return null;
    }

    const momentd = moment(birthdayString, "YYYYDDMM");

    return momentd.valueOf();
}