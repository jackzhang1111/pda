

export default{

   //打印小票
   printComponent:{

        //字符个数
        strLen:function(val) {
          var len = 0;
          for (var i = 0; i < val.length; i++) {
            var a= val.charAt(i);
            if (a.match(/[^\x00-\xff]/ig) != null) {
              len += 1;
            }else {
              len += 0.5;
            }
          }
          return len;
        },

        //空格
        spacing:function(str){
           var blank="";
           var row=Math.ceil(this.strLen(str)/16); //行数
           var len=(16*row-this.strLen(str))*2;
           for(var i=0;i<len;i++){
                blank+=' ';
           }
           console.log((str+blank).length);
           return str+blank;
        },

        //左右对齐
        justify:function(str1,str2){
           var blank="";
           var len=(16-this.strLen(str1)-this.strLen(str2))*2;
           for(var i=0;i<len;i++){
                blank+=' ';
           }
           return str1+blank+str2;
        },

        //分割线
        newline:function(){
          var line="--------------------------------";
          return line;
        },

        //打印(拣货单)
        print3:function(_this){ 
           var str='';
           //str+='   —YOULENONG—  ';
           str+=this.spacing(' ');
           str+=this.spacing('订单号:'+_this.order_no);

           for(var i=0;i<_this.goodsArr.length;i++){
               var v=_this.goodsArr[i];
               str+=this.spacing(v.goods_name);
               str+=this.justify('销价:'+v.goods_price+'/'+v.unit,'购买量:'+v.goods_num);
               str+=this.spacing('货号:'+v.product_no);
               //str+=this.justify('折扣:-xxx','折后:xxx');
               str+=this.newline();
           }
           str+=this.spacing(new Date().Format('MM-dd hh:mm:ss'));
           str+=this.spacing(' ');
           str+=this.spacing(' ');
           str+=this.spacing(' ');
           _this.bluetoothTool.sendData(str);
        }
   }


}

