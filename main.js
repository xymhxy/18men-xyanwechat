var app = new Vue({
    el: '#app',
    data: {
        // 当前时间
        nowTime: null,
        // 当前昼夜
        DayandNight: null,
        // 主题模式：false=亮色（默认），true=暗色
        isDarkTheme: false,
        // 摄妖香时间 25分钟
        IncenseCountDownTime: 25 * 60 * 1000,
        IncenseDisabled: false,
        // 回梦丹时间 60分钟
        PelletCountDownTime: 60 * 60 * 1000,
        PelletDisabled: false,
        // 月光时间 30分钟
        countDownTime: 30 * 60 * 1000,
        // 月光列表
        MoonlightList: [
            { label: "女魃", isDisabled: false },
            { label: "天机", isDisabled: false },
            { label: "花果", isDisabled: false },
            { label: "神木", isDisabled: false },
            { label: "龙宫", isDisabled: false },
        ],
        checkedSect: [],
        // 门派列表
        sectList: [
            "大唐129 44",
            "方寸100 36",
            "化生19 7",
            "女儿84 46",
            "神木62 45",
            "天机41 44",
            "地府120 6",
            "魔王16 16",
            "狮驼原地",
            "盘丝167 19",
            "无底原地",
            "女魃14 36",
            "五庄19 31",
            "普陀原地",
            "凌波23 60",
            "花果32 87",
            "天宫216 21",
            "龙宫54 23",
            "弥勒原地",
        ],
        // 准备事项列表
        prepareList: [
            "骑乘坐骑",
            "好感度>90",
            "饱食度>50",
            "统御宝宝",
            "坐骑装饰耐久>50",
            "召唤兽心得",
            "召唤兽寿命",
            "召唤兽状态",
            "天赋符",
            "宝宝装备耐久",
            "忠义肉脯",
            "所有队员天阵",
            "女魃墓 28,49",
            "天机城 71,62",
            "花果山 58,74",
            "神木林 53,62",
            "龙宫 85,41",
            "法宝灵气",
            "神器灵气",
            "1000仙玉属性",
            "地梵刀",
            "清理藏宝图",
            "古神-女儿神木地府",
            "仙玉-化生无底洞",
            "神仙饮",
            "暗器",
            "变身卡",
            "回梦丹",
            "旗子",
            "境外合成旗",
            "境外导标旗",
            "国境导标旗",
            "新春飞行符/飞行符",
            "摄妖香",
            "点卡",
            "游戏分辨率最小",
            "飞行机油",
            "经脉",
            "符石打开/耐久",
            "星石套装",
            "人/宝宝秘制红蓝",
            "挂暗器",
            "挂自动",
            "59分：变卡",
            "59分：每个号吃香",
            "59分：吃回梦丹",
            "59分：队员升为队长",
        ],
        // 道具数据（重构为二维数组）
        itemsData: [
            [
                '<span class="location">长安</span><br><span class="coords">210 229</span><br><span class="name">领任务</span>',
                '<span class="location">傲来</span><br><span class="coords">9 147</span><br><span class="name">女儿村</span>',
                '<span class="location">傲来</span><br><span class="coords">217 146</span><br><span class="name">花果山</span>',
                '<span class="location">长安</span><br><span class="coords">311 275</span><br><span class="name">大唐官府</span>',
                '<span class="location">长安</span><br><span class="coords">511 277</span><br><span class="name">化生寺</span>',
            ],
            [
                '<span class="location">长寿</span><br><span class="coords">110 206</span><br><span class="name">方寸山</span>',
                '<span class="location">傲来</span><br><span class="coords">178 18</span><br><span class="name">女魃墓/龙宫</span>',
                '<span class="location">长安</span><br><span class="coords">288 45</span><br><span class="name">阴曹地府</span>',
                '<span class="location">长安</span><br><span class="coords">360 76</span><br><span class="name">神木林</span>',
                '<span class="location">新春飞行符</span><br><span class="coords">宝象国右下</span><br><span class="name">无底洞</span>',
            ],
            [
                '<span class="location">境外导标旗</span><br><span class="coords">8 49</span><br><span class="name">狮驼岭</span>',
                '<span class="location">境外导标旗</span><br><span class="coords">55 114</span><br><span class="name">魔王寨</span>',
                '<span class="location">国境导标旗</span><br><span class="coords">191 23</span><br><span class="name">普陀山</span>',
                '<span class="location">境外导标旗</span><br><span class="coords">528 113</span><br><span class="name">盘丝岭</span>',
                '<span class="location">境外导标旗</span><br><span class="coords">633 77</span><br><span class="name">五庄观</span>',
            ],
            [
                '<span class="name">摄妖香</span>',
                '<span class="location">境外导标旗</span><br><span class="coords">55 13</span><br><span class="name">天宫</span>',
                '<span class="location">境外合成旗</span><br><span class="coords">墨家村</span><br><span class="name">天机城</span>',
                '<span class="name">暗器</span><br><span class="name">大蓝</span>',
                '<span class="coords">/</span>',
            ],
        ],
        // 传送人坐标（重构为结构化数据）
        transporterData: [
            { route: "郊外 => 天宫", coord: "(31, 48)" },
            { route: "东海湾 => 岩洞", coord: "(85, 24)" },
            { route: "岩洞 => 女魃墓", coord: "(177, 66)" },
            { route: "东海湾 => 龙宫", coord: "(103, 78)" },
            { route: "碗子山 => 无底洞", coord: "(16, 8)" },
            { route: "国境旗 => 普陀", coord: "(211, 50)" },
            { route: "国境 => 凌波", coord: "(164, 251)" },
            { route: "境外墨家 => 天机城", coord: "(200, 19)" },
        ],
        rounds: 0,
        isEditMoonlight: false,
        dayNightInterval: null,
    },
    computed: {
        totalSects: function () {
            return this.sectList.length;
        },
        nextSectNOMText: function () {
            var len = this.checkedSect.length;
            var total = this.totalSects;
            var oneThird = Math.ceil(total / 3);
            var twoThird = Math.ceil(total * 2 / 3);
            if (len + 1 <= oneThird || len + 1 > total) {
                return '八怪';
            } else if (len + 1 <= twoThird) {
                return '九怪';
            } else if (len + 1 <= total) {
                return '十怪';
            }
            return '八怪';
        },
        nextSectNOMClass: function () {
            var len = this.checkedSect.length;
            var total = this.totalSects;
            var oneThird = Math.ceil(total / 3);
            var twoThird = Math.ceil(total * 2 / 3);
            if (len + 1 <= oneThird || len + 1 > total) {
                return 'tag-green';
            } else if (len + 1 <= twoThird) {
                return 'tag-orange';
            } else if (len + 1 <= total) {
                return 'tag-red';
            }
            return 'tag-green';
        },
        nextSectInvisible: function () {
            return (this.checkedSect.length + 1) % 3 === 0;
        },
    },
    methods: {
        // 切换主题
        toggleTheme: function () {
            this.isDarkTheme = !this.isDarkTheme;
            if (this.isDarkTheme) {
                document.documentElement.setAttribute('data-theme', 'dark');
            } else {
                document.documentElement.removeAttribute('data-theme');
            }
            this.showToast(this.isDarkTheme ? '已切换为暗色主题' : '已切换为亮色主题', 'success');
        },

        // 显示Toast通知
        showToast: function (message, type) {
            type = type || 'info';
            var container = document.getElementById('toast-container');
            var toast = document.createElement('div');
            toast.className = 'toast-notification toast-' + type;
            toast.textContent = message;
            container.appendChild(toast);
            setTimeout(function () {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 3000);
        },

        // 昼夜提示
        startDayNightNotify: function () {
            var self = this;
            if (this.dayNightInterval) {
                clearInterval(this.dayNightInterval);
            }
            this.currentTime(new Date());
            this.dayNightInterval = setInterval(function () {
                self.currentTime(new Date());
            }, 1000);
            this.showToast('昼夜提示已开启', 'success');
        },

        currentTime: function (timeStamp) {
            var hh = new Date(timeStamp).getHours();
            var mm = new Date(timeStamp).getMinutes();
            var ss = new Date(timeStamp).getSeconds();
            hh = hh < 10 ? '0' + hh : '' + hh;
            mm = mm < 10 ? '0' + mm : '' + mm;
            ss = ss < 10 ? '0' + ss : '' + ss;

            this.nowTime = hh + ':' + mm + ':' + ss;

            var minutes = new Date(timeStamp).getMinutes();
            if ((minutes >= 10 && minutes < 25) || (minutes >= 40 && minutes < 55)) {
                this.DayandNight = 'DAY';
            } else {
                this.DayandNight = 'NIGHT';
            }
        },

        // 清空关卡
        handleClearSect: function () {
            this.checkedSect = [];
            this.rounds++;
            this.showToast('已清空！下一关进入八怪模式', 'success');
        },

        // 关卡变化
        handleChangeSect: function () {
            var len = this.checkedSect.length;
            var total = this.totalSects;
            var oneThird = Math.ceil(total / 3);
            var twoThird = Math.ceil(total * 2 / 3);
            if (len === oneThird) {
                this.showToast('下一关进入九怪模式', 'warning');
            } else if (len === twoThird) {
                this.showToast('下一关进入十怪模式', 'warning');
            }
        },

        // 月光CD
        start: function (index) {
            this.$refs['countdown' + index][0].start();
            this.MoonlightList[index].isDisabled = true;
        },

        reset: function (index) {
            this.$refs['countdown' + index][0].reset();
            this.MoonlightList[index].isDisabled = false;
        },

        // 摄妖香
        startIncense: function () {
            this.resetIncense();
            this.$refs.countdownIncense.start();
            this.showToast('摄妖香已开启，25分钟倒计时', 'success');
        },

        alertIncense: function () {
            this.showToast('⚠️ 摄妖香时间到！请注意续香！', 'warning');
            window.alert('摄妖香时间到，请注意！');
        },

        resetIncense: function () {
            this.$refs.countdownIncense.reset();
        },

        // 回梦丹
        startPellet: function () {
            this.$refs.countdownPellet.start();
            this.PelletDisabled = true;
            this.showToast('回梦丹已服用，60分钟后可吃第二颗', 'success');
        },

        alertPellet: function () {
            this.showToast('💊 第二颗回梦丹可以吃了！', 'success');
            window.alert('第二颗回梦丹可以吃了');
        },

        // 月光减少30秒
        discountMoonlightTime: function (index) {
            var ref = this.$refs['countdown' + index][0];
            ref.pause();
            ref.setRemain(ref.getRemain() - 30 * 1000);
            ref.start();
            this.showToast(this.MoonlightList[index].label + ' 减少30秒', 'info');
        },

        // 编辑月光
        handleEditMoonlight: function () {
            this.isEditMoonlight = true;
        },

        handleFinishEditMoonlight: function () {
            this.isEditMoonlight = false;
            this.showToast('门派名称已保存', 'success');
        },
    }
});