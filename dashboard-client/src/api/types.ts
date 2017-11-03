export interface ApiQueryParams {
  sid?: string
  skip?: number
  limit?: number
}

export interface ProductMeta {
  agentId: string
  productId?: string
  productType?: string
}

export interface BrowserApiQuery extends ApiQueryParams {
  url_type?: number
}

export interface ImageApiQuery extends ApiQueryParams {
  image_category?: string
}

export interface TagsApiQuery extends ApiQueryParams {
  tagtoadd?: string
  tagtodelete?: string
}

export interface MarksApiQuery extends ApiQueryParams {
  markvalue?: string
}

export interface LoginApiQuery extends ApiQueryParams {
  username: string
  password: string
}

export interface IMApiQuery extends ApiQueryParams {
  convid?: string // for fetching a page containing the conversation (topic) for the supplied id
}

export interface ContactsApiQuery extends ApiQueryParams {
  filters?: any, // TODO: use some sort of Filters interface
}
