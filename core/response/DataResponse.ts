export default interface DataResponse<T> {
  data: T
  message: string
  detail: string
  token?: number
}