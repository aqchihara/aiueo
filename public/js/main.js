var vm = new Vue({
    el: '#main',
    data() {
        return {
            width: window.innerWidth,
            height: window.innerHeight,
            targetWidth: pageWidth,
            targetHeight: pageHight,
            maxTextLength: maxTextLength,
            marginBottom: 0,
            visualMode: "icon",
            cssTransform: "",
            num: 0,
            wordList: [],
            imageList: [],
            canvas: null,
            maxWidth: 300,
            smallImages: [],
            isResizing: false,
            all: [
                'あいうえお',
                'かきくけこ',
                'さしすせそ',
                'たちつてと',
                'なにぬねの',
                'はひふへほ',
                'まみむめも',
                'や　ゆ　よ',
                'らりるれろ',
                'わをん、。'
            ].reverse(),
            dakuon_dic: {
                "か": "が",
                "き": "ぎ",
                "く": "ぐ",
                "け": "げ",
                "こ": "ご",
                "さ": "ざ",
                "し": "じ",
                "す": "ず",
                "せ": "ぜ",
                "そ": "ぞ",
                "た": "だ",
                "ち": "ぢ",
                "つ": "づ",
                "て": "で",
                "と": "ど",
                "は": "ば",
                "ひ": "び",
                "ふ": "ぶ",
                "へ": "べ",
                "ほ": "ぼ",
                "ぱ": "ば",
                "ぴ": "び",
                "ぷ": "ぶ",
                "ぺ": "べ",
                "ぽ": "ぼ",
                "が": "か",
                "ぎ": "き",
                "ぐ": "く",
                "げ": "け",
                "ご": "こ",
                "ざ": "さ",
                "じ": "し",
                "ず": "す",
                "ぜ": "せ",
                "ぞ": "そ",
                "だ": "た",
                "ぢ": "ち",
                "づ": "つ",
                "で": "て",
                "ど": "と",
                "ば": "は",
                "び": "ひ",
                "ぶ": "ふ",
                "べ": "へ",
                "ぼ": "ほ",
                "ば": "ぱ",
                "び": "ぴ",
                "ぶ": "ぷ",
                "べ": "ぺ",
                "ぼ": "ぽ",
            },
            handakuon_dic: {
                "は": "ぱ",
                "ひ": "ぴ",
                "ふ": "ぷ",
                "へ": "ぺ",
                "ほ": "ぽ",
                "ば": "ぱ",
                "び": "ぴ",
                "ぶ": "ぷ",
                "べ": "ぺ",
                "ぼ": "ぽ",
                "ぱ": "は",
                "ぴ": "ひ",
                "ぷ": "ふ",
                "ぺ": "へ",
                "ぽ": "ほ",
                "ぱ": "ば",
                "ぴ": "び",
                "ぷ": "ぶ",
                "ぺ": "べ",
                "ぽ": "ぼ",
            },
            youon_sokuon_dic: {
                "つ": "っ",
                "や": "ゃ",
                "ゆ": "ゅ",
                "よ": "ょ",
                "あ": "ぁ",
                "い": "ぃ",
                "う": "ぅ",
                "え": "ぇ",
                "お": "ぉ",
                "っ": "つ",
                "ゃ": "や",
                "ゅ": "ゆ",
                "ょ": "よ",
                "ぁ": "あ",
                "ぃ": "い",
                "ぅ": "う",
                "ぇ": "え",
                "ぉ": "お",
            },
            text: "",
        }
    },
    methods: {
        playSound: function(event) {
            this.speak(this.text);
        },
        touchStartEdit: function(num) { //android・chrome用
            var userAgent = window.navigator.userAgent.toLowerCase();
            if (userAgent.indexOf('chrome') != -1) {
                localStorage.setItem('editNo', num);
                window.location.href = './edit.html';
            } else if (userAgent.indexOf('safari') != -1) {}
        },
        touchEndEdit: function(num) { //ios・safari用
            var userAgent = window.navigator.userAgent.toLowerCase();
            if (userAgent.indexOf('chrome') != -1) {} else if (userAgent.indexOf('safari') != -1) {
                localStorage.setItem('editNo', num);
                window.location.href = './edit.html';
            }
        },
        touchStartChar: function(event) { //android・chrome用
            var userAgent = window.navigator.userAgent.toLowerCase();
            if (userAgent.indexOf('chrome') != -1) {
                if (event.target.text != undefined) {
                    this.clickChar(event);
                }
            } else if (userAgent.indexOf('safari') != -1) {}
        },
        touchEndChar: function(event) { //ios・safari用
            var userAgent = window.navigator.userAgent.toLowerCase();
            if (userAgent.indexOf('chrome') != -1) {} else if (userAgent.indexOf('safari') != -1) {
                if (event.target.text != undefined) {
                    this.clickChar(event);
                }
            }
        },
        touchStartWord: function(event) { //android・chrome用
            var userAgent = window.navigator.userAgent.toLowerCase();
            if (userAgent.indexOf('chrome') != -1) {
                if (event.target.text != undefined) {
                    this.text = "";
                    this.clickChar(event);
                }
            } else if (userAgent.indexOf('safari') != -1) {}
        },
        touchEndWord: function(event) { //ios・safari用
            var userAgent = window.navigator.userAgent.toLowerCase();
            if (userAgent.indexOf('chrome') != -1) {} else if (userAgent.indexOf('safari') != -1) {
                if (event.target.text != undefined) {
                    this.text = "";
                    this.clickChar(event);
                }
            }
        },
        clickChar: function(event) {
            if (event.target.text == "　") {
                return;
            }
            if (event.target.text == "゛") {
                this.beDakuon();
                return;
            }
            if (event.target.text == "゜") {
                this.beHandakuon();
                return;
            }
            if (event.target.text == "小") {
                this.beYouonSokuon();
                return;
            }

            if (this.text.length != this.maxTextLength) { //文字数が許容できない場合はスキップ
                this.text += event.target.text
                var text = event.target.text
                if (text == "は") {
                    text = "派"
                }
                if (text == "へ") {
                    text = "屁"
                }
                setTimeout(() => {
                    this.speak(text)
                }, 10);
            }
        },
        toggleVisualMode: function() {
            this.visualMode = {
                "icon": "text",
                "text": "icon"
            }[this.visualMode]
        },
        deleteAll: function(event) {
            if (confirm("本当に消しますか？")) {
                this.text = ""
            }
        },
        deleteChar: function(event) {
            this.text = this.text.slice(0, -1)
        },
        registerWord: function(event) {
            this.wordList[this.num] = this.text
            localStorage.setItem('wordList', JSON.stringify(this.wordList));

            window.location.href = './edit_list.html';
        },
        beDakuon: function(event) {
            if (this.text.slice(-1) in this.dakuon_dic) {
                this.text = this.text.slice(0, -1) + this.dakuon_dic[this.text.slice(-1)]
            }
            this.speak(this.text.slice(-1))
        },
        beHandakuon: function(event) {
            if (this.text.slice(-1) in this.handakuon_dic) {
                this.text = this.text.slice(0, -1) + this.handakuon_dic[this.text.slice(-1)]
            }
            this.speak(this.text.slice(-1))
        },
        beYouonSokuon: function(event) {
            if (this.text.slice(-1) in this.youon_sokuon_dic) {
                this.text = this.text.slice(0, -1) + this.youon_sokuon_dic[this.text.slice(-1)]
            }
            this.speak(this.text.slice(-1))
        },
        speak: function(text) {
            const uttr = new SpeechSynthesisUtterance(text)
            speechSynthesis.speak(uttr)

        },
        previewFile: function(num) {
            const preview = document.getElementById('img' + num);
            const file = document.getElementById('image' + num).files[0];
            const reader = new FileReader();
            var imageList = this.imageList

            reader.addEventListener("load", function() {
                // 画像ファイルを base64 文字列に変換します
                preview.src = reader.result;
                imageList[num] = preview.src
                localStorage.setItem('imageList', JSON.stringify(imageList));
            }, false);

            if (file) {
                reader.readAsDataURL(file);
            }
        },
        onImageChange: function(num) {

            this.isResizing = true;
            this.smallImages = [];
            const preview = document.getElementById('img' + num);
            const file = document.getElementById('image' + num).files[0];


            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                let img = new Image()
                img.src = reader.result;

                let width = img.width;
                let height = img.height;

                if (width > this.maxImageWidth) {

                    height = Math.round(height * this.maxImageWidth / width);
                    width = this.maxImageWidth;

                }

                let canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                let ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);
                ctx.canvas.toBlob((blob) => {

                    const imageFile = new File([blob], file.name, {
                        type: file.type,
                        lastModified: Date.now()
                    });
                    this.smallImages.push(imageFile);

                    let reader2 = new FileReader();
                    reader2.readAsDataURL(imageFile);
                    reader2.onload = (e) => {
                        console.log(reader2.result)

                        this.imageList[num] = reader2.result
                        localStorage.setItem('imageList', JSON.stringify(this.imageList));
                    }


                    this.isResizing = false; // リサイズ完了！

                }, file.type, 1);


            };


        },
        onImageChange2(e) {
            this.isResizing = true;
            this.smallImages = [];
            const files = e.target.files;
            const num = e.target.getAttribute("num");
            const preview = document.getElementById('img' + num);

            for (let file of files) {

                let reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = (e) => {

                    let img = new Image();
                    img.onload = () => {
                        console.log(11)

                        let width = img.width;
                        let height = img.height;

                        if (width > this.maxWidth) {

                            height = Math.round(height * this.maxWidth / width);
                            width = this.maxWidth;

                        }

                        let canvas = document.createElement('canvas');
                        canvas.width = width;
                        canvas.height = height;
                        let ctx = canvas.getContext('2d');
                        ctx.drawImage(img, 0, 0, width, height);
                        ctx.canvas.toBlob((blob) => {

                            const imageFile = new File([blob], file.name, {
                                type: file.type,
                                lastModified: Date.now()
                            });
                            this.smallImages.push(imageFile);
                            console.log(this.smallImages[0].size)
                            let reader2 = new FileReader();
                            reader2.readAsDataURL(imageFile);
                            reader2.onload = (e) => {
                                this.imageList[num] = reader2.result;
                                preview.src = reader2.result;
                                localStorage.setItem('imageList', JSON.stringify(this.imageList));

                            }



                        }, file.type, 1);

                    };
                    img.src = e.target.result;

                };

            }

        }

    },
    created: function() {
        // サイズ調整
        this.marginBottom = this.height - document.getElementById('main').clientHeight
        if (this.width > this.height) {
            this.cssTransform = `scale(calc(${this.width} / ${this.targetWidth}), calc(${this.height} / ${this.targetHeight}))`
        } else {
            this.cssTransform = `rotate(90deg) translateY(-${this.width}px) scale(calc(${this.height} / ${this.targetWidth}), calc(${this.width} / ${this.targetHeight})) `
        }

        // ローカルストレージの初期化
        if (localStorage.getItem('wordList') == null) {
            localStorage.setItem('wordList', JSON.stringify(
                ["ありがとう", "さようなら", "ごめんなさい", "べんきょうしたいです", "おみずがのみたいです", "といれにいきたいです", "あそびたいです", "つかれました", "ごろんしたいです", "あしたてんきになぁれ"]
            ));
        }
        this.wordList = JSON.parse(localStorage.getItem('wordList'))

        if (localStorage.getItem('imageList') == null) {
            localStorage.setItem('imageList', JSON.stringify(
                ["", "", "", "", "", "", "", "", "", ""]
            ));
        }
        this.imageList = JSON.parse(localStorage.getItem('imageList'))





        // 編集ページでの動き
        this.num = localStorage.getItem('editNo');
        localStorage.removeItem('editNo')

        if (this.num != undefined) {
            this.wordList = JSON.parse(localStorage.getItem('wordList'))
            this.text = this.wordList[this.num]
        }
    }
});