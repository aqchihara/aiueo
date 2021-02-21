var vm = new Vue({
    el: '#main',
    data: {
        width: window.innerWidth,
        height: window.innerHeight,
        targetWidth: pageWidth,
        targetHeight: pageHight,
        marginBottom: 0,
        visualMode: "icon",
        cssTransform: "",
        wordList: [],
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
        },
        text: "",
    },
    methods: {
        playSound: function(event) {
            this.speak(this.text);
        },
        touchStartEdit: function(num) { //android・chrome用
            window.location.href = './edit.html?num=' + num;
        },
        touchEndEdit: function(num) { //ios・safari用
            window.location.href = './edit.html?num=' + num;

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
    }
});