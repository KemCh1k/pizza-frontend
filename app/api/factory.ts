import type { AxiosInstance, AxiosRequestConfig } from "axios";
import type { THttpMethod } from "~/types/api";

class HttpFactory {
  private readonly client: AxiosInstance;

  constructor(client: AxiosInstance) {
    this.client = client;
  }

  async call<T>(
    method: THttpMethod,
    url: string,
    data?: object,
    extras: AxiosRequestConfig = {},
  ): Promise<T> {
    const methodModified = method.toLowerCase();
    const hasBody = ["post", "put", "patch"].includes(methodModified);

    const config: AxiosRequestConfig = {
      method: methodModified as AxiosRequestConfig["method"],
      url,
      ...extras,
    };

    if (hasBody) {
      config.data = data;
    } else {
      // для GET/DELETE/HEAD параметры передаются как query params
      config.params = data;
    }
    const response = await this.client.request<T>(config);
    return response.data;
  }
}

export default HttpFactory;
