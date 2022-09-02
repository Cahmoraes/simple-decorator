"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isArray(object) {
    return Array.isArray(object);
}
var sd = (function () {
    var simpleDecorator = {
        /**
         * @param {object} thisArg
         * @param {object} handler
         * */
        property: function (thisArg, handler) {
            try {
                if (typeof thisArg !== 'object') {
                    throw new Error('ThisArgs should be an Object Instance');
                }
                if (typeof handler !== 'object') {
                    throw new Error('handler should be an Object');
                }
                Object.keys(handler).forEach(function (property) {
                    var handlers = handler[property];
                    if (isArray(handlers)) {
                        handlers.forEach(function (decorator) {
                            decorator(thisArg, property);
                        });
                    }
                    else {
                        var decorator = handler[property];
                        if (typeof decorator !== 'function') {
                            throw new Error('decorator should be a function');
                        }
                        decorator(thisArg, property);
                    }
                });
            }
            catch (error) {
                console.error(error.message);
            }
        },
        /**
         * @param {function} clazz
         * @param {object} handler
         * */
        method: function (clazz, handler) {
            try {
                if (typeof clazz !== 'function') {
                    throw new Error('Clazz should be a Constructor Function');
                }
                if (typeof handler !== 'object') {
                    throw new Error('handler should be an Object');
                }
                Object.keys(handler).forEach(function (property) {
                    var handlers = handler[property];
                    if (isArray(handlers)) {
                        handlers.reverse().forEach(function (decorator) {
                            var method = clazz.prototype[property];
                            if (typeof method !== 'function') {
                                throw new Error("".concat(property, " isn't at prototype of ").concat(clazz.name));
                            }
                            clazz.prototype[property] = function () {
                                var args = [];
                                for (var _i = 0; _i < arguments.length; _i++) {
                                    args[_i] = arguments[_i];
                                }
                                return decorator(method.bind(this), property, args);
                            };
                        });
                    }
                    else {
                        var method_1 = clazz.prototype[property];
                        if (typeof method_1 !== 'function') {
                            throw new Error("".concat(property, " isn't at prototype of ").concat(clazz.name));
                        }
                        var decorator_1 = handler[property];
                        clazz.prototype[property] = function () {
                            var args = [];
                            for (var _i = 0; _i < arguments.length; _i++) {
                                args[_i] = arguments[_i];
                            }
                            return decorator_1(method_1.bind(this), property, args);
                        };
                    }
                });
            }
            catch (error) {
                console.error(error.message);
            }
        },
    };
    return simpleDecorator;
})();
exports.default = sd;
//# sourceMappingURL=sd.js.map