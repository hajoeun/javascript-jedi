// var constructor = function (spec, my) {
//     var that = {},
//         home = spec.city,
//         gender = spec.gender,
//         major = spec.major,
//         name = my.name,
//         email = my.email,
//         age = my.age;
//
//     my = my || {};
//
//     my.name = name;
//     my.email = email;
//     my.gender = gender;
//
//     that.get_home = function () {
//         return home;
//     };
//
//     that.get_gender = function () {
//         return gender;
//     };
//
//     that.get_major = function () {
//         return major;
//     };
//
//     that.get_name = function () {
//         return name;
//     };
//
//     that.get_email = function () {
//         return email;
//     };
//
//     that.get_age = function () {
//         return age;
//     };
//
//
//     return that;
// };
//
// var member_spec = {
//     gender: 'male',
//     city: 'Seoul',
//     major: 'Computer Science'
// };
// var my_spec = {
//     name: 'joeunha',
//     email: 'imjoeunha@gmail.com',
//     age: 27
// };
//
// var new_member = constructor(member_spec, my_spec);
//
// console.log(my_spec.gender);

var mammal = function(spec) {
    var that = {};

    that.get_name = function() {
        return spec.name;
    };

    that.says = function() {
        return spec.saying || '';
    };

    return that;
};

var cat = function (spec) {
    spec.saying = spec.saying || 'meow';
    var that = mammal(spec);
    that.purr = function (n) {
        var i, s = '';
        for (i = 0; i < n; i += 1) {
            if (s) {
                s += '-'
            }
            s += 'r';
        }
        return s;
    };
    that.get_name = function() {
        return that.says() + ' ' + spec.name + ' ' + that.says();
    };
    return that;
};

var myCat = cat({name: 'Citty'});
console.log(myCat.get_name());