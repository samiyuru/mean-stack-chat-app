/**
 * Created by samiyuru
 */

var app = angular.module("chatapp", []);

app.controller("chatCtrl", function ($scope, $http) {


    var ui = {
        isName: false
    };

    var msgs = [
        {
            sender: "Samiyuru",
            text: " ksdjhf kjsdhfk ds",
            isMe: true
        },
        {
            sender: "Hasith",
            text: " ksdjhf kjsdhfk ds",
            isMe: false
        },
        {
            sender: "Rasika",
            text: "sjkdfhskdj f",
            isMe: false
        }
    ];

    var msg = {
        sender: "",
        text: ""
    };

    function enter() {
        ui.isName = true;
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
