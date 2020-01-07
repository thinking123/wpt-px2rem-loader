module.exports = function px2rem(str, conf){
    return str.replace(/\b([\d\.]+)px\b/g, function(s, px) {
        px = +px;
        
        return (px / conf.rem).toFixed(4) + 'rem/* @source-size: ' + px + 'px; */';
    });
}