/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */
'use strict';

module.exports = function (grunt) {
    var cldrVersion = '27.0.3';

    grunt.initConfig({
        clean: {
            data: 'data/',
            tmp : 'tmp/',
        },

        curl: {
            'cldr-core': {
                src : 'https://github.com/unicode-cldr/cldr-core/archive/' + cldrVersion + '.zip',
                dest: 'tmp/cldr-core.zip',
            },

            'cldr-dates-full': {
                src : 'https://github.com/unicode-cldr/cldr-dates-full/archive/' + cldrVersion + '.zip',
                dest: 'tmp/cldr-dates-full.zip',
            },
        },

        unzip: {
            'cldr-core': {
                src : 'tmp/cldr-core.zip',
                dest: 'tmp/',
            },

            'cldr-dates-full': {
                src : 'tmp/cldr-dates-full.zip',
                dest: 'tmp/',
            },
        },

        copy: {
            'cldr-core': {
                expand: true,
                cwd   : 'tmp/cldr-core-' + cldrVersion + '/',
                dest  : 'data/',
                src   : [
                    'LICENSE',
                    'defaultContent.json',
                    'supplemental/parentLocales.json',
                    'supplemental/plurals.json',
                    'supplemental/ordinals.json',
                ]
            },

            'cldr-dates-full': {
                expand: true,
                cwd   : 'tmp/cldr-dates-full-' + cldrVersion + '/',
                dest  : 'data/',
                src   : [
                    'main/*/dateFields.json',
                ]
            },
        },
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-curl');
    grunt.loadNpmTasks('grunt-zip');

    grunt.registerTask('update-cldr-data', [
        'clean',
        'curl',
        'unzip',
        'copy',
    ]);
};
