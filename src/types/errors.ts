export default class ResourceNotFoundError extends Error {
  status: number;
  constructor(message: string) {
    super(message);
    this.name = "ResourceNotFoundError";
    this.status = 404;
  }
}