export class CreatePostDTO {
  title: string;
  content: string;

  constructor(title: string, content: string) {
    this.title = title;
    this.content = content;
  }
}

export class PostDTO extends CreatePostDTO {
  _id: string;

  constructor(_id: string, title: string, content: string) {
    super(title, content);
    this._id = _id;
  }
}