'use strict';

app.factory('notifyService', function () {
        return {
            showInfo: function(msg) {
                noty({
                        text: msg,
                        type: 'success',
                        layout: 'bottomRight',
                        timeout: 2000}
                );
            },
            showError: function(msg, serverError) {
                // Collect errors to display from the server response
                var errors = [];
                if (serverError && serverError.data) {
                    errors.push(serverError.data);
                }
                if (serverError && serverError.data) {
                    errors.push(serverError.data);
                }
                if (serverError && serverError.data) {
                    var modelStateErrors = serverError.data;
                    for (var propertyName in modelStateErrors) {
                        var errorMessages = modelStateErrors[propertyName];
                        var trimmedName = propertyName.substr(propertyName.indexOf('.') + 1);
                        for (var i = 0; i < errorMessages.length; i++) {
                            var currentError = errorMessages[i];
                            errors.push(trimmedName + ' - ' + currentError);
                        }
                    }
                }
                if (errors.length > 0) {
                    msg = msg + "<br>" + errors.join("<br>");
                }

                noty({
                        text: msg,
                        type: 'error',
                        layout: 'bottomLeft',
                        timeout: 5000}
                );
            }
        }
    }
);
