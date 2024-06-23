export class PostDTO {
    _id: number
    title: string
    content: string
  
    constructor(_id: number, title: string, content: string) {
      this._id = _id
      this.title = title
      this.content = content
    }
  }