/*
* 未解决浮点数运算Bug的JavaScript
* liumeng
* 2016/4/20
*/
//确定是否进行过计算
var notCal=true;
//记录是否进行单个数的运算  
var singleCal=false; 
//记录运算符号，1:+ 2:- 3:* 4:/
var calType;  
//记录第一个操作数
var firstNum; 
//按键背景变色函数
function changeColor(tmp)    
{
    tmp.style.color="#fff";
    tmp.style.backgroundColor="#000";
    setTimeout(function(){
        tmp.style.color="#000";
        tmp.style.backgroundColor="#fff";},150
    );
}
//清除输入
function myDelete(tmp)  
{
    changeColor(tmp);
    //清除屏幕数字     
    document.getElementById("tex_num").innerHTML=0;
    document.getElementById("tex_err").innerHTML="";
}
//清除所有数据
function Reset(tmp)  
{
    changeColor(tmp);
    //屏幕复位为0
    firstNum=0;
    notCal=true;
    calType=0;
    document.getElementById("tex_num").innerHTML=0;
    document.getElementById("tex_exp").innerHTML="";
    document.getElementById("tex_err").innerHTML="";
}
function inNumber(tmp)
{
    changeColor(tmp);
    if(notCal)
    {
        var nums=document.getElementById("tex_num").innerHTML;
        if(nums=="0")
            document.getElementById("tex_num").innerHTML=tmp.innerHTML;
        else if(nums.length<=9)
            document.getElementById("tex_num").innerHTML+=tmp.innerHTML;
        else if(nums.length==10)
            document.getElementById("tex_err").innerHTML="输入数字太长，无法显示!";
    }
    else
    {
        document.getElementById("tex_err").innerHTML="";
        document.getElementById("tex_exp").innerHTML="";
        document.getElementById("tex_num").innerHTML=tmp.innerHTML;
        notCal=true;
        singleCal=false;
    }
}
function inDot(tmp)
{
    changeColor(tmp);
    if(notCal)
    {
        var nums=document.getElementById("tex_num").innerHTML;
        if(nums.length<=8)
            document.getElementById("tex_num").innerHTML+=tmp.innerHTML;
        else if(nums.length==9)
            document.getElementById("tex_err").innerHTML="输入数字太长，无法显示!";
    }
    else
    {
        notCal=true;
        singleCal=false;
        document.getElementById("tex_exp").innerHTML="";
        document.getElementById("tex_err").innerHTML="";
        document.getElementById("tex_num").innerHTML="0.";
    }
}
function posNeg(tmp)
{
    changeColor(tmp);
    var nums=document.getElementById("tex_num").innerHTML;
    if(nums.substr(0,1)=="-")
        document.getElementById("tex_num").innerHTML=nums.substr(1,nums.length);
    else 
        document.getElementById("tex_num").innerHTML="-"+nums;
}
var l;
function percent(tmp)
{
    changeColor(tmp);
    var nums=document.getElementById("tex_num").innerHTML;
    var secondNum=nums*0.01*firstNum;
    if((!notCal)||singleCal)
    {
        document.getElementById("tex_num").innerHTML=0;
    }
    else
    {
        document.getElementById("tex_num").innerHTML=secondNum;
        switch(calType)
        {
            case 1:
                document.getElementById("tex_exp").innerHTML=firstNum+"+("+secondNum+")";
            case 2:
                document.getElementById("tex_exp").innerHTML=firstNum+"-("+secondNum+")";
            case 3:
                document.getElementById("tex_exp").innerHTML=firstNum+"×("+secondNum+")";
            case 4:
                document.getElementById("tex_exp").innerHTML=firstNum+"/("+secondNum+")";
        }
    }
}
function square(tmp)
{
    changeColor(tmp);
    notCal=false;
    singleCal=true;
    var nums=document.getElementById("tex_num").innerHTML;
    document.getElementById("tex_exp").innerHTML="sqr("+nums+")";
    var squ=nums*nums;
    //整数的平方
    if(nums%1==0)  
    {
        var squNum=new Number(squ);
        if(squNum.toString().length<=10)
            document.getElementById("tex_num").innerHTML=squ;
        else if(squNum.toString().length<=16)
            document.getElementById("tex_num").innerHTML=squNum.toExponential(5);
        else
        {
            document.getElementById("tex_err").innerHTML="计算结果太大，无法显示!";
            document.getElementById("tex_num").innerHTML=0;
        }
    }
    //小数的平方
    else    
    {
        if(squ.toString().length<=10)
        {
            document.getElementById("tex_num").innerHTML=squ;
            document.getElementById("tex_err").innerHTML="";
        }
        else if(squ.toString().length>10)
        {
            if(squ%1!=0)
            {
                document.getElementById("tex_num").innerHTML=squ.toString().substr(0,11);
                document.getElementById("tex_err").innerHTML="计算结果后面一些小数略去!";
            }
            else 
            {
               document.getElementById("tex_num").innerHTML=squ.toString().substr(0,10); 
               document.getElementById("tex_err").innerHTML="计算结果太大，无法显示!";
            }
        }
    }
}
function root(tmp)
{
    changeColor(tmp);
    notCal=false;
    singleCal=true;
    var nums=document.getElementById("tex_num").innerHTML;
    document.getElementById("tex_exp").innerHTML="√("+nums+")";
    var squ=Math.pow(nums,0.5);
    if(squ.toString().length<=10)
    {
        document.getElementById("tex_num").innerHTML=squ;
        document.getElementById("tex_err").innerHTML="";
    }
    else if(squ.toString().length>10)
    {
        document.getElementById("tex_num").innerHTML=squ.toString().substr(0,11);
        document.getElementById("tex_err").innerHTML="计算结果后面一些小数略去!";
    }
}
function reciprocal(tmp)
{
    changeColor(tmp);
    notCal=false;
    singleCal=true;
    var nums=document.getElementById("tex_num").innerHTML;
    document.getElementById("tex_exp").innerHTML="1/("+nums+")";
    var squ=1/nums;
    if(squ.toString().length<=10)
    {
        document.getElementById("tex_num").innerHTML=squ;
        document.getElementById("tex_err").innerHTML="";
    }
    else if(squ.toString().length>10)
    {
        document.getElementById("tex_num").innerHTML=squ.toString().substr(0,11);
        document.getElementById("tex_err").innerHTML="计算结果太小，后面小数略去!";
    }
}
function add(tmp)
{
    changeColor(tmp);
    calType=1;
    firstNum=document.getElementById("tex_num").innerHTML;
    document.getElementById("tex_num").innerHTML=0;
    document.getElementById("tex_exp").innerHTML=firstNum+"+";    
}
function sub(tmp)
{
    changeColor(tmp);
    calType=2;
    firstNum=document.getElementById("tex_num").innerHTML;
    document.getElementById("tex_num").innerHTML=0;
    document.getElementById("tex_exp").innerHTML=firstNum+"-";    
}
function multiply(tmp)
{
    changeColor(tmp);
    calType=3;
    firstNum=document.getElementById("tex_num").innerHTML;
    document.getElementById("tex_num").innerHTML=0;
    document.getElementById("tex_exp").innerHTML=firstNum+"×";    
}
function division(tmp)
{
    changeColor(tmp);
    calType=4;
    firstNum=document.getElementById("tex_num").innerHTML;
    document.getElementById("tex_num").innerHTML=0;
    document.getElementById("tex_exp").innerHTML=firstNum+"/";
}
function displayResult(temp)
{
    if(temp.toString().length<=10)
        document.getElementById("tex_num").innerHTML=temp;
    else if(temp%1!=0)
    {
        document.getElementById("tex_num").innerHTML=temp.toString().substr(0,11);
        document.getElementById("tex_err").innerHTML="计算结果后面一些小数略去!";
    }
    else 
    {
       document.getElementById("tex_num").innerHTML=temp.toString().substr(0,10); 
       document.getElementById("tex_err").innerHTML="计算结果太大，无法显示!";
    }    
}
function equal(tmp)
{
    changeColor(tmp);
    notCal=false;
    var nums=document.getElementById("tex_num").innerHTML;
    switch(calType)
    {
        case 1:
            document.getElementById("tex_exp").innerHTML=firstNum+"+("+nums+")";
            var result=firstNum*1+nums*1;
            displayResult(result);
            break;
        case 2:
            document.getElementById("tex_exp").innerHTML=firstNum+"-("+nums+")";
            var result=firstNum-nums;
            displayResult(result);
            break;
        case 3:
            document.getElementById("tex_exp").innerHTML=firstNum+"×("+nums+")";
            var result=firstNum*nums;
            displayResult(result);
            break;
        case 4:
            if(nums==0)
                document.getElementById("tex_err").innerHTML="除数为0错误！";
            else
            {
                document.getElementById("tex_exp").innerHTML=firstNum+"/("+nums+")";
                var result=firstNum/nums;
                displayResult(result);
            }
            break;
    }
}