export default class Model {
  [key: string]: any;

  constructor(payload: any) {
    Object.assign(this, payload);
  }

  clone() {
    return structuredClone(this);
  }
}
