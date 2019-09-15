angular.module('tableExample')
    .controller('MainController', function ($scope, $mdDialog) {
        var mainCtrl = this;

        mainCtrl.example = {
            'tableList': [
                {
                    'name': 'andy',
                    'phone': '0912-345-678',
                    'email': 'andy.pan@test.com',
                },
                {
                    'name': 'user',
                    'phone': '+886912345678',
                    'email': 'user@test.com.tw',
                },
            ],

        };
        mainCtrl.phoneRegex = /^[0-9+-]+$/;


        mainCtrl.add = function (name, phone, email) {
            mainCtrl.example.tableList.push({
                'name': name,
                'phone': phone,
                'email': email,
            });
        };

        mainCtrl.edit = function (idx, name, phone, email) {
            mainCtrl.example.tableList[idx] = {
                'name': name,
                'phone': phone,
                'email': email,
            };
        };

        mainCtrl.del = function (ev, idx) {
            var userInfo = mainCtrl.example.tableList[idx];
            var confirm = $mdDialog.confirm()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title('Are you sure?')
                .textContent("You will be delete '" + userInfo.name + "' user")
                .ariaLabel('Delete an user')
                .targetEvent(ev)
                .ok('Delete')
                .cancel('Cancel');

            $mdDialog.show(confirm).then(function () {
                mainCtrl.example.tableList.splice(idx, 1);
            }, function () {
            });
        };

        mainCtrl.showDialog = function (ev, type, idx) {
            if (mainCtrl.dialog == undefined && type == 'create') {
                mainCtrl.dialog = {
                    'type': type,
                    'title': 'Create an user',
                    'submit': 'Create',
                    'name': undefined,
                    'phone': undefined,
                    'email': undefined,
                };
            } else if (type == 'edit') {
                mainCtrl.dialog = {
                    'type': type,
                    'index': idx,
                    'title': 'Edit an user',
                    'submit': 'Update',
                    'name': mainCtrl.example.tableList[idx].name,
                    'phone': mainCtrl.example.tableList[idx].phone,
                    'email': mainCtrl.example.tableList[idx].email,
                };
            }
            mainCtrl.nameList = Object.values(mainCtrl.example.tableList).map(
                function (item) {
                    return item.name
                }
            );
            $mdDialog.show({
                'contentElement': '#dialog',
                'targetEvent': ev,
                'clickOutsideToClose': true,
            });
        };

        mainCtrl.dialogHide = function () {
            if (mainCtrl.dialog.type == 'edit') {
                mainCtrl.dialog = undefined;
            }
            $scope.dialogForm.$setPristine();
            $mdDialog.hide();
        }

        mainCtrl.dialogCancel = function () {
            mainCtrl.dialog = undefined;
            $scope.dialogForm.$setPristine();
            $mdDialog.cancel();
        }

        mainCtrl.dialogSubmit = function () {
            var dialogVal = mainCtrl.dialog;

            switch (dialogVal.type) {
                case 'create':
                    mainCtrl.add(
                        dialogVal.name,
                        dialogVal.phone,
                        dialogVal.email
                    );
                    break;
                case 'edit':
                    mainCtrl.edit(
                        dialogVal.index,
                        dialogVal.name,
                        dialogVal.phone,
                        dialogVal.email
                    );
                    break;
            }
            mainCtrl.dialog = undefined;
            $scope.dialogForm.$setPristine();
            $mdDialog.hide();
        }

        mainCtrl.checkUnique = function (fromObj) {
            var nameList = mainCtrl.nameList;

            if (mainCtrl.dialog.type == 'edit' && mainCtrl.example.tableList[mainCtrl.dialog.index].name === mainCtrl.dialog.name) {
                fromObj.$setValidity("nameExist", true);
            } else if (nameList.indexOf(mainCtrl.dialog.name) != -1) {
                fromObj.$setValidity("nameExist", false);
            } else {
                fromObj.$setValidity("nameExist", true);
            }
        }
    });                   
