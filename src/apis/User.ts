import Model, { IModelOptions } from './Model';

export class GetFrontEndConfig extends Model {
  constructor() {
    super();
    this.options = {
      url: '/getFrontEndConfig',
      type: 'get',
      disToken: true,
    };
  }

  formatOptions(data: IModelOptions) {
    const result = { ...this.options, ...data };
    this.options = result;
    return this;
  }

  isSuccess(data: Record<string, any>): boolean {
    return data.code == 200;
  }

  handlerData(data: Record<string, any>): Record<string, any> {
    return data;
  }
}

export class GetUserInfo extends Model {
  constructor() {
    super();
    this.options = {
      url: '/getInfo',
      type: 'get',
    };
  }

  formatBeforeRequestData(data: Record<string, any>): Record<string, any> {
    const $data = _.cloneDeep(data);
    $data.username = data.name;
    delete $data.name;
    return $data;
  }

  handlerData(data: Record<string, any>): Record<string, any> {
    return data;
  }
}

export class UpdageUserInfo extends Model {
  constructor() {
    super();
    this.options = {
      url: '/updateInfo',
      type: 'get',
    };
  }
}
