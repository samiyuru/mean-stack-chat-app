/**
 * Created by samiyuru
 */

var app = angular.module("chatapp", []);

app.controller("chatCtrl", function ($scope, $http) {


    var ui = {
        isName: false
    };

    var lTime = 0;

    var msgs = [
    ];

    var msg = {
        sender: "",
        text: ""
    };

    function loadMsgs(_lTime) {
        $http({
            method: "GET",
            url: "/msg",
            params: {
                me: msg.sender,
                time: _lTime
            }
        }).success(function (status) {
                if (status.success) {
                    var _msgs = status.data;
                    var len = _msgs.length;
                    for (var i = 0; i < len; i++) {
                        var _msg = _msgs[i];
                        _msg.isMe = false;
                        msgs.push(_msg);
                    }
                    lTime = status.lTime;
                } else {
                    alert(status.err);
                }
            });
    }

    function enter() {
        ui.isName = true;
        loadMsgs(lTime);
        setInterval(function(){
            loadMsgs(lTime);
        }, 2000);
    }

    function key(e) {
        if (e.keyCode == 13) {
            //alert(msg.sender + " typed: " + msg.text);
            $http({
                method: "POST",
                url: "/msg",
                params: msg
            }).success(function (status) {
                    if (status.success) {
                        var _msg = status.data;
                        _msg.isMe = true;
                        msgs.push(_msg);
                        msg.text = "";
                    } else {
                        alert(status.err);
                    }
                });
        }
    }

    $scope.ui = ui;
    $scope.msg = msg;
    $scope.msgs = msgs;
    //-------------
    $scope.enter = enter;
    $scope.key = key;

});

app.directive("scrolldown", function(){
    function link(){
        scrollBottom();
    }
    return {
        restrict:'A',
        link:link
    };
});
