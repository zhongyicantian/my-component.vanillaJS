/*
copyright 2021, zhongyicantian
www.github.com/zhongyicantian
*/
// 1.a drawing component
customElements.define('draw-component', class extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
<style>:host {position: relative;background-color: #f0f;}canvas{outline: 3px solid #000;border-radius: 15px;position: relative;margin: 3px auto;}.toogle-tool-bar{z-index: 9;}button, input[type="color"],.pen,.rubber,.row,.cancel,.column,.stroketext,.filltext,#font,#strokeWidth,.download{color: black;border: none;cursor: pointer;width: 25px;height: 25px;outline: 1px solid #000;overflow: hidden;text-align: center;transition: all 0.2s ease-in-out;}#strokeWidth,#font{padding:0;transform: translateY(-8px);}button,.download{border-radius: 50%;}.cancel,.strokeWidth{display: inline-block;}.pen,#color,.column,.filltext{border-top-right-radius: 50%;border-bottom-right-radius: 50%;display: inline-block;}.rubber,#Backgroundcolor,.row,.stroketext{border-top-left-radius: 50%;border-bottom-left-radius: 50%;display: inline-block;}.pen-rubber,.color-bgcolor,.shift,.text{height: 25px;}.active{background-color: #4caf50;}button:active {background-color: #4CAF50;color: white;}input[type="color"]::-webkit-color-swatch-wrapper {padding: 0;}#Backgroundcolor::-webkit-color-swatch {border: none;width: 30px;}#color::-webkit-color-swatch {border: none;width: 10px;}.tools-main{display: flex;justify-content: space-around;align-items: center;background-image: linear-gradient(to bottom, rgba(255,255,255,.2), rgba(255,255,255,1));margin-top: 10px;}.hidden{display: none;}/*.mouse{position: absolute;border:1px solid #000;}*/
</style><canvas></canvas><div class="mouse"></div> <div class="tools-main"><div class="toogle-tool-bar"><button title="toogle the tool bar" id="toogle">X</button></div><div class="tools clear"><button title="clear the canvas" id="clear">C</button></div><div class="tools color-bgcolor"><input type="color" id="Backgroundcolor" title="select background color"/><input type="color" id="color" title="select color"/></div><!--div class="tools text"><div class="stroketext" title="clear the canvas" id="clear"><svg t="1638014792545" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5376" width="15" height="15"><path d="M991.996472 32.014816v63.995767h-415.989417a32.003528 32.003528 0 0 0-32.003527 31.992239v863.99365h-63.995767V128.014111a31.992239 31.992239 0 0 0-31.992239-31.992239H32.014816v-64.007056h959.981656M1024 0.011289H0.022577V128.014111h447.992945v895.985889h127.991533V128.014111H1024V0.011289z" p-id="5377"></path></svg></div><div class="tools strokeWidth"><input type="text" id="font" title="input your stroke and rubber size" value="10"/></div><div class="filltext" title="clear the canvas" id="clear"><svg t="1638014822513" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6230" width="15" height="15"><path d="M456.133 928V170.383H173.125V69.016h680.859v101.367H569.805V928H456.133z" fill="#2c2c2c" p-id="6231"></path></svg></div></div--><div class="tools pen-rubber"><div class="tools rubber " title="rubber tools"><svg t="1637598088331" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3809" width="21" height="21"><path d="M891.46 893.42H132.54c-18.3 0-33.18 14.88-33.18 33.18s14.88 33.18 33.18 33.18h758.93c18.3 0 33.18-14.88 33.18-33.18 0-18.29-14.89-33.18-33.19-33.18zM193.02 734.36c39.62 39.64 92.39 61.46 148.6 61.46S450.6 774 490.22 734.36L769.5 455.08c39.63-39.62 61.46-92.39 61.46-148.59 0-56.21-21.83-108.99-61.46-148.61l-32.12-32.11c-39.7-39.7-92.48-61.56-148.6-61.56-56.13 0-108.92 21.86-148.61 61.56L160.91 405.04c-81.94 81.94-81.94 215.27 0 297.21l32.11 32.11z m307.3-103.94L264.85 394.96 487.1 172.71c27.16-27.15 63.28-42.12 101.68-42.12 38.4 0 74.51 14.97 101.67 42.12l32.12 32.11c56.05 56.06 56.05 147.29 0 203.34L500.32 630.42zM217.93 441.88L453.4 677.34l-10.1 10.1c-56.06 56.04-147.29 56.04-203.34 0l-32.12-32.11c-56.06-56.06-56.06-147.31 0-203.36l10.09-10.09z" p-id="3810"></path></svg></div><div class="tools strokeWidth"><input type="text" id="strokeWidth" title="input your stroke and rubber size" value="10"/></div><div class="tools pen active" title="pen tools"><svg t="1637583962220" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2298" width="25" height="25"><path fill="#fff" d="M652.624 145.904c62.256-62.272 163.2-62.272 225.472 0 62.272 62.256 62.272 163.2 0 225.472L477.808 771.664a28.8 28.8 0 0 1-10.816 6.8L242.4 857.376c-47.04 16.544-92.32-28.736-75.776-75.776l78.896-224.592c1.44-4.08 3.76-7.776 6.816-10.816L652.624 145.904z m184.752 40.72a101.84 101.84 0 0 0-144.032 0L297.696 582.272l-76.736 218.4a2.512 2.512 0 0 0-0.16 0.736c0 0.096 0 0.192 0.032 0.272a2.112 2.112 0 0 0 0.56 0.928 2.096 2.096 0 0 0 0.928 0.56c0.08 0.032 0.16 0.032 0.272 0.032 0.096 0 0.32-0.032 0.72-0.16l218.4-76.736 395.664-395.664a101.84 101.84 0 0 0 0-144z" p-id="2299"></path><path fill="#fff" d="M610.64 199.2a28.8 28.8 0 0 1 40.736 0l173.728 173.728a28.8 28.8 0 1 1-40.736 40.736L610.64 239.936a28.8 28.8 0 0 1 0-40.72zM266.368 543.488a28.8 28.8 0 0 1 40.736 0l173.728 173.728a28.8 28.8 0 0 1-40.736 40.736L266.368 584.208a28.8 28.8 0 0 1 0-40.72z" p-id="2300"></path></svg></div></div><div class="tools shift"><div class="row" title="row straight locking"><svg t="1637660817777" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1252" width="20" height="20"><path d="M881 562H81c-27.6 0-50-22.4-50-50s22.4-50 50-50h800c27.6 0 50 22.4 50 50s-22.4 50-50 50z" p-id="1253"></path><path d="M907.6 540.7L695.5 328.6c-19.5-19.5-19.5-51.2 0-70.7s51.2-19.5 70.7 0L978.4 470c19.5 19.5 19.5 51.2 0 70.7-19.6 19.6-51.2 19.6-70.8 0z" p-id="1254"></path><path d="M695.5 695.4l212.1-212.1c19.5-19.5 51.2-19.5 70.7 0s19.5 51.2 0 70.7L766.2 766.1c-19.5 19.5-51.2 19.5-70.7 0s-19.5-51.2 0-70.7z" p-id="1255"></path></svg></div><div class="cancel" title="cancel straight locking"><svg t="1637660924530" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3621" width="25" height="25"><path d="M851.416 217.84l-45.256-45.248L512 466.744l-294.152-294.16-45.256 45.256L466.744 512l-294.152 294.16 45.248 45.256L512 557.256l294.16 294.16 45.256-45.256L557.256 512z" fill="#272536" p-id="3622"></path></svg></div><div class="column" title="column straight locking"><svg t="1637660889062" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2713" width="20" height="20"><path d="M462 881V81c0-27.6 22.4-50 50-50s50 22.4 50 50v800c0 27.6-22.4 50-50 50s-50-22.4-50-50z" p-id="2714"></path><path d="M483.3 907.6l212.1-212.1c19.5-19.5 51.2-19.5 70.7 0s19.5 51.2 0 70.7L554 978.4c-19.5 19.5-51.2 19.5-70.7 0-19.6-19.6-19.6-51.2 0-70.8z" p-id="2715"></path><path d="M328.6 695.5l212.1 212.1c19.5 19.5 19.5 51.2 0 70.7s-51.2 19.5-70.7 0L257.9 766.2c-19.5-19.5-19.5-51.2 0-70.7s51.2-19.5 70.7 0z" p-id="2716"></path></svg></div></div><div class="tools download" title="download your art"><svg t="1637587759014" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2170" width="20" height="20"><path d="M996.01 1024H27.99c-7.318 0-13.825-2.837-19.5-8.49-5.653-5.675-8.49-12.16-8.49-19.5 0-8.02 2.837-14.677 8.49-20.01 5.675-5.333 12.16-8 19.5-8h968.02c7.318 0 13.825 2.667 19.5 8 5.653 5.333 8.49 11.99 8.49 20.01 0 7.318-2.837 13.825-8.49 19.5-5.675 5.653-12.16 8.49-19.5 8.49z m-69.013-648c5.334 5.333 7.83 11.99 7.51 20.01-0.342 8-3.84 14.998-10.496 20.993L529.984 811.989l-4.992 2.006-2.987 2.986a44.8 44.8 0 0 1-22.997 0l-2.005-2.986a6.784 6.784 0 0 1-5.014-1.984L97.003 417.003a33.216 33.216 0 0 1-6.998-21.014c0-8 2.496-14.506 7.488-19.498 5.014-4.992 11.84-7.488 20.502-7.488 8.682 0 15.338 2.346 20.01 6.997l347.968 346.005V27.99c0-8 2.496-14.656 7.51-19.989C498.496 2.667 504.66 0 512 0s13.504 2.667 18.496 8c5.013 5.333 7.51 11.99 7.51 20.01v693.974l347.967-345.963c4.672-4.672 11.35-6.997 20.011-6.997s15.659 2.347 20.992 6.997z" p-id="2171"></path></svg></div></div>`;
        /**
         * init the cancvas
         * get the width and hight 
         */
        this.canvas = this.shadowRoot.querySelector('canvas');
        let size = this.getAttribute('size');
        size = size.split(/\s/)
        let canvasBackground = this.getAttribute('background');
        this.tools = this.shadowRoot.querySelector('.tools-main');
        const options = {
            full: (canvas, tools) => {
                canvas.width = document.body.scrollWidth - 6;
                canvas.height = window.innerHeight - this.tools.scrollHeight * 1.6;
                tools.style.width = `${document.body.scrollWidth}px`;
            },
            size: (canvas, tools, width, height) => {
                canvas.width = width;
                canvas.height = height;
                tools.style.width = `${width}px`;
            },
            default0: (canvas, tools) => {
                canvas.width = 600;
                canvas.height = 400;
                tools.style.width = `600px`;
            }
        }
        let setSize = (...opt) => {
            options[opt[0]](this.canvas, this.tools, opt[1], opt[2])
        }
        setSize(...size);
        canvasBackground ??= '#fff'
        this.canvas.style.backgroundColor = canvasBackground;
        this.ctx = this.canvas.getContext('2d');
    }
    connectedCallback() {
        /**
         * detecitve the class
         * @param {*} element 
         * @param {*} cls 
         * @returns boolean 
         */
        function hasClass(element, cls) {
            return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
        }
        /**
         * choose the pen color
         */
        let color = this.shadowRoot.querySelector('#color');
        color.addEventListener('change', () => {
            this.ctx.fillStyle = color.value;
        })
        /**
         * choose canvas background color
         */
        let _backgroundcolor = this.shadowRoot.querySelector('#Backgroundcolor');
        _backgroundcolor.addEventListener('change', () => {
            this.canvas.style.backgroundColor = _backgroundcolor.value;
        })
        /**
         * show or hide the tools bar
         */
        let toogleToolBar = this.shadowRoot.querySelector('#toogle');
        let tools = this.shadowRoot.querySelectorAll('.tools');
        let toolstext = [...tools];
        toogleToolBar.addEventListener('click', () => {
            toolstext.map(item => {
                item.classList.toggle('hidden');
            })
        })
        /**
         * get the pen stroke size in attribute "drawWidth"
         */
        let drawWidth = 10;
        let input = this.shadowRoot.querySelector('#strokeWidth')
        let drawWidthChange = () => {
            drawWidth = input.value
            return drawWidth
        }
        input.addEventListener("change", drawWidthChange)

        /**
         * init the drawing
         */
        draw(this.canvas, this.ctx);

        // mousemoving pointer *-under construction-*
        function mousemove() {
            //  let mouse = this.shadowRoot.querySelector('.mouse');
            //  mouse.style.width = `${drawWidth}px`;
            //  mouse.style.height = `${drawWidth}px`;
            //  mouse.style.backgroundColor = color.value;
            //  this.canvas.onmousemove = (event)=>{
            //      var event = event || window.event;
            //      let pageX = event.pageX || event.clientX + document.documentElement.scrollLeft;
            //      let pageY = event.pageY || event.clientY + document.documentElement.scrollTop;
            //      let targetX = pageX - mouse.offsetWidth / 2;
            //      let targetY = pageY - mouse.offsetHeight / 2;
            //      mouse.style.left = `${targetX}px`;
            //      mouse.style.top = `${targetY}px`;
            //  }
        }
        mousemove.call(this);
        /**
         * choose the pen or rubber
         * ↓ element seleter
         */
        let rubber = this.shadowRoot.querySelector('.rubber');
        let pen = this.shadowRoot.querySelector('.pen');
        /**
         * rubber active!
         */
        rubber.addEventListener('click', () => {
            if (hasClass(pen, 'active')) {
                rubber.classList.add('active');
                pen.classList.remove('active');
                let rubberPathTrue = this.shadowRoot.querySelectorAll('.rubber.active>svg>path');
                let penPathFalse = this.shadowRoot.querySelectorAll('.pen>svg>path');
                rubberPathTrue.forEach(item => {
                    item.setAttribute('fill', '#fff');
                })
                penPathFalse.forEach(item => {
                    item.removeAttribute('fill');
                })
                /**
                 * cancel the straight locking icon
                 */
                let rowTrue = this.shadowRoot.querySelectorAll('.row.active>svg>path');
                let columnTrue = this.shadowRoot.querySelectorAll('.column.active>svg>path');
                row.classList.remove('active')
                column.classList.remove('active')
                rowTrue.forEach(item => {
                    item.removeAttribute('fill')
                })
                columnTrue.forEach(item => {
                    item.removeAttribute('fill')
                })
                rubberthedraw(this.canvas, this.ctx);
            }
        });
        /**
         * pen active!
         */
        pen.addEventListener('click', () => {
            if (hasClass(rubber, 'active')) {
                rubber.classList.remove('active');
                pen.classList.add('active');
                let penPathTrue = this.shadowRoot.querySelectorAll('.pen.active>svg>path');
                let rubberPathFalse = this.shadowRoot.querySelectorAll('.rubber>svg>path');
                penPathTrue.forEach(item => {
                    item.setAttribute('fill', '#fff');
                })
                rubberPathFalse.forEach(item => {
                    item.removeAttribute('fill');
                })
                draw(this.canvas, this.ctx);
            }
        });
        /**
         * main rubber work function
         * @param {*} canvas 
         * @param {*} ctx 
         */
        function rubberthedraw(canvas, ctx) {
            canvas.addEventListener('mousedown', (e) => {
                let targetX = e.offsetX - drawWidth / 2
                let targetY = e.offsetY - drawWidth / 2
                ctx.clearRect(targetX, targetY, drawWidth, drawWidth);
                canvas.onmousemove = (e) => {
                    let targetX = e.offsetX - drawWidth / 2
                    let targetY = e.offsetY - drawWidth / 2
                    ctx.clearRect(targetX, targetY, drawWidth, drawWidth);
                }
                canvas.addEventListener('mouseup', () => {
                    canvas.onmousemove = null;
                })
            })
        }
        /**
         * main pen work function
         * @param {*} canvas 
         * @param {*} ctx 
         */
        function draw(canvas, ctx) {
            canvas.addEventListener('mousedown', (e) => {
                let targetX = e.offsetX - drawWidth / 2
                let targetY = e.offsetY - drawWidth / 2
                ctx.fillRect(targetX, targetY, drawWidth, drawWidth);
                canvas.onmousemove = (e) => {
                    let targetX = e.offsetX - drawWidth / 2
                    let targetY = e.offsetY - drawWidth / 2
                    ctx.fillRect(targetX, targetY, drawWidth, drawWidth);
                }
                canvas.addEventListener('mouseup', () => {
                    canvas.onmousemove = null;
                })
            })
        }
        /**
         *  drow a straight line row or column direction
         * ↓ element selector
         */
        let row = this.shadowRoot.querySelector('.row');
        let column = this.shadowRoot.querySelector('.column');
        let cancel = this.shadowRoot.querySelector('.cancel');
        /**
         * row direction
         */
        row.addEventListener('click', () => {
            row.classList.add('active')
            column.classList.remove('active')
            let rowTrue = this.shadowRoot.querySelectorAll('.row.active>svg>path');
            let columnFalse = this.shadowRoot.querySelectorAll('.column>svg>path');
            rowTrue.forEach(item => {
                item.setAttribute('fill', '#fff');
            })
            columnFalse.forEach(item => {
                item.removeAttribute('fill')
            })
            straightRow(this.canvas, this.ctx)
        })
        /**
         * column direction
         */
        column.addEventListener('click', () => {
            column.classList.add('active')
            row.classList.remove('active')
            let columnTrue = this.shadowRoot.querySelectorAll('.column.active>svg>path');
            let rowFalse = this.shadowRoot.querySelectorAll('.row>svg>path');
            columnTrue.forEach(item => {
                item.setAttribute('fill', '#fff');
            })
            rowFalse.forEach(item => {
                item.removeAttribute('fill')
            })
            straightColumn(this.canvas, this.ctx)
        })
        /**
         * cancel the straight locking
         */
        cancel.addEventListener('click', () => {
            let rowTrue = this.shadowRoot.querySelectorAll('.row.active>svg>path');
            let columnTrue = this.shadowRoot.querySelectorAll('.column.active>svg>path');
            row.classList.remove('active')
            column.classList.remove('active')
            rowTrue.forEach(item => {
                item.removeAttribute('fill')
            })
            columnTrue.forEach(item => {
                item.removeAttribute('fill')
            })
            draw(this.canvas, this.ctx);
        })
        /**
         * main row work function
         * @param {*} canvas 
         * @param {*} ctx 
         */
        function straightRow(canvas, ctx) {
            canvas.addEventListener('mousedown', (e) => {
                let targetX = e.offsetX - drawWidth / 2
                let targetY = e.offsetY - drawWidth / 2
                ctx.fillRect(targetX, targetY, drawWidth, drawWidth);
                let save = e.offsetY - drawWidth / 2
                canvas.onmousemove = (e) => {
                    let targetX = e.offsetX - drawWidth / 2
                    ctx.fillRect(targetX, save, drawWidth, drawWidth);
                }
                canvas.addEventListener('mouseup', () => {
                    canvas.onmousemove = null;
                })
            })
        }
        /**
         * main column work function
         * @param {*} canvas 
         * @param {*} ctx 
         */
        function straightColumn(canvas, ctx) {
            canvas.addEventListener('mousedown', (e) => {
                let targetX = e.offsetX - drawWidth / 2
                let targetY = e.offsetY - drawWidth / 2
                ctx.fillRect(targetX, targetY, drawWidth, drawWidth);
                let save = e.offsetX - drawWidth / 2
                canvas.onmousemove = (e) => {
                    let targetY = e.offsetY - drawWidth / 2
                    ctx.fillRect(save, targetY, drawWidth, drawWidth);
                }
                canvas.addEventListener('mouseup', () => {
                    canvas.onmousemove = null;
                })
            })
        }
        //storkeline (backup plan)*-never use-*
        function strokemethod() {
            // let mousedown = false
            // let iLastX,iLastY
            // this.canvas.onmousedown = (e)=>{
            //     mousedown = true;
            //     iLastX = e.clientX - this.canvas.offsetLeft + (window.pageXOffset||document.body.scrollLeft||document.documentElement.scrollLeft);
            //     iLastY = e.clientY - this.canvas.offsetTop + (window.pageYOffset||document.body.scrollTop||document.documentElement.scrollTop);
            // }
            // this.canvas.onmouseup = ()=>{
            //     mousedown = false;
            //     iLastX = -1;
            //     iLastY = -1;
            // }
            // this.canvas.onmousemove = (e)=>{
            //     if (mousedown) {
            //         var iX = e.clientX - this.canvas.offsetLeft + (window.pageXOffset||document.body.scrollLeft||document.documentElement.scrollLeft);
            //         var iY = e.clientY - this.canvas.offsetTop + (window.pageYOffset||document.body.scrollTop||document.documentElement.scrollTop);
            //         this.ctx.lineWidth = drawWidth;
            //         this.ctx.moveTo(iLastX, iLastY);
            //         this.ctx.lineTo(iX, iY);
            //         this.ctx.stroke();
            //         iLastX = iX;
            //         iLastY = iY;
            //     }
            //     }
        }

        /**
         * clean up the canvas
         */
        let clear = this.shadowRoot.querySelector('#clear');
        clear.addEventListener('click', () => {
            //refresh the canvas
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        })
        /**
         * converts canvas to images and download
         */
        let download = this.shadowRoot.querySelector('.download')
        this.canvas = this.shadowRoot.querySelector('canvas');
        let ul = this.shadowRoot.querySelector('ul');
        download.addEventListener('click', () => {
            canvasToImage(this.canvas)
        })
        let count = 1;
        function canvasToImage(canvas) {
            let image = new Image()
            image.src = canvas.toDataURL(`image/png`);
            let a = document.createElement('a');
            a.href = image.src;
            a.download = `myArt${count++}.png`;
            a.innerHTML = 'download';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    }
});
// 2.a carousel component
customElements.define('carousel-component', class extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `<style>#auto_image_box{position: relative;}#auto_image_box>.img_box{position: absolute;top: 0;left: 0;opacity: 0;transition: opacity 0.5s;transition-timing-function: linear;}#auto_image_box>.img_box:nth-child(1){opacity: 1;position: relative;}img{cursor: pointer;border-radius: 15px;}.button-flex{display: flex;justify-content: space-between;align-items: center;position: relative;z-index: 9;}#left,#right{width: 30px;height: 30px;margin: 5px;outline: none;border: none;color: #fff;background-color: rgba(140, 140, 140, 0.658);font-weight: bolder;font-size: 20px;cursor: pointer;text-align: center;border-radius: 50%;}.xuan li{list-style: none;float: left;margin-left: 5px;}.xuan{position: absolute;left: 50%;transform: translateX(-50%);padding: 0;margin:0;z-index: 9;}.circle{width: 10px;height: 10px;border-radius: 50%;background: #fff;border: 1px solid #000;cursor: pointer;}.active{background: #000;border: 1px solid #fff;}</style><div class="main" style="margin-top:10px"><div id="auto_image_box"><ul class="xuan"></ul><div class="button-flex"><input type="button" value="<" id="left"><input type="button" value=">" id="right"></div></div>  </div>`;
        let reg = /[\[|\]|\{|\}\?]/g;
        let picSrcList = this.getAttribute('picSrcList');
        let spliticon = this.getAttribute('spliticon');
        this.removeAttribute('picSrcList');
        this.removeAttribute('spliticon');
        picSrcList = picSrcList.replace(reg, '')
        spliticon ??= '*'
        let picSrcListArr = picSrcList.split(spliticon);
        let picCount = picSrcListArr.length;
        let picLinkList = this.getAttribute('picLinkList');
        this.removeAttribute('picLinkList');
        picLinkList ??= `javascript:void(0);`;
        let img_box = this.shadowRoot.querySelector('#auto_image_box');
        img_box.style.width = `${this.getAttribute('picWidth')}px`;
        img_box.style.height = `${this.getAttribute('picHeight')}px`;
        let button_flex = this.shadowRoot.querySelector('.button-flex');
        button_flex.style.width = `${img_box.offsetWidth}px`
        button_flex.style.top = `${img_box.offsetHeight / 2.2}px`
        let ul = this.shadowRoot.querySelector('.xuan');
        addCarouselItem();
        ul.style.top = `${img_box.offsetHeight - ul.offsetHeight * 2}px`
        function addCarouselItem() {
            for (let i = 0; i < picCount; i++) {
                let carouselItem = document.createElement('div');
                carouselItem.classList.add('img_box');
                carouselItem.innerHTML = `<a href="${picLinkList/*[i]*/}"><img src="${picSrcListArr[i]}" alt=""></a>`;
                let li = document.createElement('li');
                li.innerHTML = `<div class="circle"></div>`;
                ul.appendChild(li);
                img_box.appendChild(carouselItem);
            }
        }
    }
    connectedCallback() {
        let left = this.shadowRoot.querySelector("#left");
        let right = this.shadowRoot.querySelector('#right');
        let ul = this.shadowRoot.querySelectorAll('ul>li>div');
        let image = this.shadowRoot.querySelectorAll('#auto_image_box>.img_box');
        for (let i = 0; i < ul.length; i++) {
            ((i) => {
                ul[i].onclick = () => {
                    auto_image.jump(i);
                }
            })(i)
        }
        function Image1(imgs, ul) {
            this.index = 0;
            this.imgs = imgs;
            this.ul = ul;
        }
        let photo = image.length - 1;
        Image1.prototype.next = function () {
            this.index == photo ? this.jump(this.index - photo) : this.jump(this.index + 1);
        }
        Image1.prototype.perv = function () {
            this.index == 0 ? this.jump(this.index + photo) : this.jump(this.index - 1);
        }
        Image1.prototype.jump = function (index) {
            this.imgs[this.index].style.opacity = 0;
            this.ul[this.index].classList.remove('active');
            this.imgs[index].style.opacity = 1;
            this.ul[index].classList.add('active');
            this.index = index;
        }
        left.onclick = () => {
            auto_image.perv();
        }
        right.onclick = () => {
            auto_image.next();
        }
        let auto_image = new Image1(image, ul);
        function move() {
            auto_image.next();
        }
        let delayTime = this.getAttribute('delayTime');
        delayTime ??= 2000;
        setInterval(move, delayTime);
    }
});
// 3.a navigator bar component
customElements.define('navigator-bar', class extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `<style>.navigator-bar{width: 100%;height: 66px;background-color: #fff;position: fixed;top: 0;z-index: 99;box-shadow: 0 0 5px #000;}[main] {display: flex;justify-content: space-around;text-align: center;position: relative;z-index: 2;padding: 0;margin: 0;}[main] > li {font-size: 20px;display: inline-block;} [main] a {display: block;padding: 20px;position: relative;z-index: 2;}[main] [mainli_] a {padding: 0;}[main] a:hover,[main] a:focus {background: #222;color: #fff;}[mainli] {position: relative;}[secmain] {left: 0;margin: 0;position: absolute;text-align: left;top: 100%;opacity: 0;-webkit-transform: translateY(-20px);transform: translateY(-20px);height: 1px;-webkit-transition: opacity .1s ease-out, -webkit-transform .2s ease-in-out;transition: opacity .1s ease-out, -webkit-transform .2s ease-in-out;transition: transform .2s ease-in-out, opacity .1s ease-out;transition: transform .2s ease-in-out, opacity .1s ease-out, -webkit-transform .2s ease-in-out;overflow: hidden;z-index: 1;}[secmain] {background: #eee;border-top: 0;padding: 0;margin: 0;}[secmain] li {list-style: none;text-align: center;width: inherit;}[secmain] a {white-space: nowrap;}[main] a:focus + [secmain],[mainli]:hover [secmain],[secmain]:focus-within {opacity: 1;-webkit-transform: translateY(0px);transform: translateY(0px);height: auto;z-index: 1;}</style><div class="navigator-bar"><ul main></ul></div>`;
    }
    connectedCallback() {
        const Items = this.getAttribute('items');
        let ul = this.shadowRoot.querySelector('[main]');
        this.removeAttribute('items');
        //array
        function twoDimensionalArrayStringtoObject(string) {
            //识别出二维数组
            const reg = /((?<=,|\[)(\[)(.*?)(\])(?=,|\]))/g;
            const matchArr = string.match(reg);
            const newArr = [];
            //把二维数组多余的符号去掉
            matchArr.map((item) => {
                item = item.replace(/(\[)(?=')/g, '')
                let nitem = item.split(/(?<=')(,)/)
                nitem.splice(1, 1)
                newArr.push(nitem)
            })
            newArr.forEach((item) => {
                item[0] = item[0].replace(/'/g, '')
                item[1] = item[1].replace(/\]/g, '')
                item[1] === 'null' ? item[1] = null : item[1] = item[1].split(",")
            })
            //把二维数组转化为对象
            const res = Object.fromEntries(newArr);
            return res;
        }
        const typeArr = twoDimensionalArrayStringtoObject(Items);
        //导航栏链接

        let href
        href ??= `javascript:void(0);`;

        //插入二级导航栏
        function appendToMainUl(node, typeArr) {
            let secMainUl = document.createElement('ul');
            secMainUl.setAttribute('secmain', '');
            node.appendChild(secMainUl);
            for (let j in typeArr) {
                let secMainLi = document.createElement('li');
                secMainLi.innerHTML = `<a herf=${href}>${typeArr[j]}</a>`;
                secMainUl.appendChild(secMainLi);
            }
        }
        //添加导航栏
        for (let x in typeArr) {
            let li = document.createElement('li');
            li.setAttribute('mainli', '');
            li.innerHTML = `<a herf=${href}>${x}</a>`;
            ul.appendChild(li);
            li.setAttribute('class', x);
            //获取二级导航栏插入的位置
            let node = this.shadowRoot.querySelector(`.${x}`);
            if (typeArr[x] !== null) {
                appendToMainUl(node, typeArr[x]);
            }
        }
        //控制导航栏统一宽度
        for (let i = 0; i < ul.children.length; i++) {
            let selectUl = this.shadowRoot.querySelector(`.${ul.children[i].className}`);
            let secSelectUl = this.shadowRoot.querySelector(`.${ul.children[i].className} [secmain]`);
            secSelectUl === null ? secSelectUl = selectUl : null;
            selectUl.offsetWidth > secSelectUl.offsetWidth ? secSelectUl.style.width = `${selectUl.offsetWidth}px` : selectUl.style.width = `${secSelectUl.offsetWidth}px`;
        }
    };
});

