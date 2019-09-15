angular.module('tableExample')
.controller('MainController',function ($scope){
    var homeCtrl = this;

    homeCtrl.example = {
        'tableList': [
            {
                'name': 'andy',
                'phone': '0912345678',
                'email': 'andy.pan@test.com',
            },
            {
                'name': 'uuu',
                'phone': '22222',
                'email': 'andy.pan@test.com',
            },
        ]
    };


    homeCtrl.add = function(name, phone, email){
        homeCtrl.example.tableList.push({
            name: 'aaa',
            phone: '3333',
            email: 'andy#sss',
        });
    };

    homeCtrl.edit = function(index, name, phone, email){
        homeCtrl.example.tableList[index] = {
            name: 'bbb',
            phone: '5555',
            email: 'xxxx@sdf',
        };
    };

    homeCtrl.del = function(index){
        homeCtrl.example.tableList.splice(index, 1);
    };
});                   
