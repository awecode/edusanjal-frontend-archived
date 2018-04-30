var smoothScroll = (function(root){
    var targetElement;
    root.addEventListener('transitionend', function(e){
        root.style['transition'] = '';
        root.style['transform'] = '';
       targetElement.scrollIntoView();
    });
    return function(element, time){
        var offset = element.offsetTop - (window.scrollY||document.documentElement.scrollTop||root.scrollTop);
        offset = Math.min( offset, root.offsetHeight - document.documentElement.clientHeight );
        targetElement = element;
        root.style['transition'] = 'transform '+time;
        root.style['transform'] = 'translateY(' + offset * -1 +'px)';
    }
}(document.body));

[].slice.call( document.getElementsByTagName('a') ).forEach(
    function(link){
        link.addEventListener( 'click', function(e){
        var targetElement = document.getElementById( e.target.href.replace(/[^#]*#/,'') );
        smoothScroll( targetElement, '500ms' );
       e.preventDefault(); 
    })
});