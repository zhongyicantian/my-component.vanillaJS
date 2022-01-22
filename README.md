# my-component.vanillaJS
## how to use↓
    <script type="module">
        import { CarouselComponent, NavigatorBar, DrawComponent } from "./my-component.js"
        new DrawComponent('draw-123');          //or new DrawComponent() =>  <draw-component></draw-component>
        new CarouselComponent('carousel-123');  //or new CarouselComponent() =>  <carousel-component></carousel-component>
        new NavigatorBar('navigator-123');      //or new NavigatorBar() =>  <navigator-bar></navigator-bar>
    </script>
    <body>
        <navigator-123></navigator-123>
        <carousel-123></carousel-123>
        <draw-123></draw-123>
    </body>
###### set attribute in tag
## draw-component
    <draw-component size="size 800 600"></draw-component>
###### or:
    <draw-component size="full"></draw-component>
|attribute|default|required|
| ---- | ---- | ---- |
|size|default0||
#### size options：
|options|full|size|default0|
| ---- | ---- | ---- | ---- |
|width|offset|required|600|
|height|offset|required|400|
## carousel-component
    <carousel-component picSrcList="Array" picLinkList="Array"></carousel-component>
|attribute|default|required|
| ---- | ---- | ---- |
|picSrcList|none|required|
|picLinkList|none|required|
|spliticon|*|  |

### css variable
![css variable example](https://github.com/zhongyicantian/my-component.vanillaJS/blob/main/example%20imgae/456.PNG)
## navigator-bar
    <navigator-bar items="Array"></navigator-bar>
|attribute|default|required|
| ---- | ---- | ---- |
|item|none|required|
### how to use↓
    items="[['exp',html,css,js,json],['framework',react,vue,Angular]]"
![example1](https://github.com/zhongyicantian/my-component.vanillaJS/blob/main/example%20imgae/example1.png)
![example2](https://github.com/zhongyicantian/my-component.vanillaJS/blob/main/example%20imgae/example2.png)
