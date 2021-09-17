declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
declare module '*lodash'

declare type EmitType = (event: any, ...args: any[]) => void;