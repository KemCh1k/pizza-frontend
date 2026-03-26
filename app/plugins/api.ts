// plugins/api.ts
import type { AxiosInstance } from "axios";
import axios from "axios";
import PizzasApiModule from "~/api/modules/pizzas"; // ваш модуль

interface IApiInstance {
  pizzas: InstanceType<typeof PizzasApiModule>;
}

export default defineNuxtPlugin((nuxtApp) => {
  // создаём axios-инстанс с базовым конфигом
  const axiosInstance: AxiosInstance = axios.create({
    baseURL: "https://df1b82af48776334.mokky.dev",
    timeout: 10_000,
    // другие общие опции...
  });

  // request interceptor (аналог onRequest)
  axiosInstance.interceptors.request.use(
    (config) => {
      // тут можно поставить токен, логирование и т.д.
      console.log("onRequest", config.url);
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  // response error interceptor (аналог onResponseError)
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      console.log("onResponseError", error?.response?.status);
      return Promise.reject(error);
    },
  );

  // создаём экземпляры модулей API — передаём http/axios в зависимости от того,
  // что ожидает ваш модуль (ниже — передаём http)
  const modules: IApiInstance = {
    pizzas: new PizzasApiModule(axiosInstance) as InstanceType<
      typeof PizzasApiModule
    >,
  };

  return {
    provide: {
      api: modules,
    },
  };
});

declare module "#app" {
  interface NuxtApp {
    $api: IApiInstance;
  }
}
