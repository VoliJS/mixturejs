import '../object+'

// Should attach Object+ to class, if it's clean
@Object.define
class Nothing {

}

Nothing._extend = function(){
    // something extra here
}

// should call _extend hook
@Object.define
class More extends Nothing {

}

@Object.define({
    a : 1,
    b : {
        c : 1
    }
})
class NothingWithProps{

}

@Object.define({
    a : 2,
    d : 6
})
class MoreProps extends NothingWithProps {

}