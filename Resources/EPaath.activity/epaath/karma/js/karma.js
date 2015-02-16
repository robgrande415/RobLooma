/* Documentation Note:
 *   Public methods and properties are commented with /** some text *\/
 *   and private methods and properties are commented with //
 *
 *   Please leave it that way to keep this documentation sane
 */

/*
 *      Karma Framework
 *      http://karmaeducation.org
 *
 *      Copyright (c)  2009
 *      Bryan W Berry           bryan@olenepal.org
 *      Felipe López Toledo    zer.subzero@gmail.com
 *
 *      Under MIT License:
 *      Permission is hereby granted, free of charge, to any person
 *      obtaining a copy of this software and associated documentation
 *      files (the "Software"), to deal in the Software without
 *      restriction, including without limitation the rights to use,
 *      copy, modify, merge, publish, distribute, sublicense, and/or sell
 *      copies of the Software, and to permit persons to whom the
 *      Software is furnished to do so, subject to the following
 *      conditions:
 *
 *      The above copyright notice and this permission notice shall be
 *      included in all copies or substantial portions of the Software.
 *
 *      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 *      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 *      OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 *      NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 *      HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 *      WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 *      FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 *      OTHER DEALINGS IN THE SOFTWARE.
 */

/**
 * @fileOverview Contains karma library
 * @author Bryan Berry <bryan@olenepal.org>
 * @author Felipe Lopez Toledo <zer.subzero@gmail.com>
 */

/** Karma is the namespace for the Karma library and Karma() is the constructor
 * function for the Karma library object Karma.
 * Karma() checks if the current document type is set to HTML 5, throws
 * an error if not. Otherwise, initializes the karma object and returns
 * a reference to that object.
 * @namespace Global namespace for Karma library
 * @constructor
 * @param {Object} [options={}] options for intializing Karma library
 * @param {Array} [options.image=[]] array of images to be converted into a collection
 * @param {Array} [options.audio=[]] array of audio to be converted into a collection
 * @throws {Error} if the document type declaration is not set to HTML 5, e.g.
 * <!DOCTYPE html>
 * @throws {Error} If any of the initialization parameters are invalid values
 * @returns {Object} Karma -- reference to the initialized Karma library
 * @example
 *
 * var k = Karma({
 *                 image: [
 *                    {name: 'ninja', file: 'ninja.png'},
 *                    {name: 'cowboy', file: 'cowboy.png'}
 *                         ],
 *                 audio: [
 *                    {name: 'woosh', file: 'woosh.ogg'},
 *                    {name: 'yeehaw', file: 'yeehaw.ogg'}
 *                         ]
 *                 });
 * Next, call the ready function with a callback to your program code
 *
 * k.ready(function () { ... your application code . . . }
 *
 * after that you can access each asset like so
 * k.image.ninja;
 * k.audio.yeehaw.play();
 *
 */
var Karma = function (options) {
    if (Karma._initialized === true) {
        return Karma;
    } else {
        return Karma._init(options);
    }
};

// Helper functions

/**This emulates the Object.create method in ecmascript 5 spec
 * This isn't a full implementation as it doesn't support an all of Object.create's features
 * This has the same functionality as Crockford's beget method
 * and this primary building block for prototypal inheritance in
 * this library
 * @param {Object} parent that the new object's prototype should point to
 * @returns {Object} a new object whose prototype is parent
 * @example
 *
 * var ninja = { weapon: 'sword' };
 * var ninja1 = Karma.create(ninja);
 * ninja1.weapon === 'sword'
 */
Karma.create = function (parent, extensions) {
    function F() {};
    F.prototype = parent;
    var result = new F();
    if (extensions) {
        Karma.extend(result, extensions);
    }
    return result;
};

/** Extends properties of the target object with those of
 * the source object
 * @param {Object} target object to be extended
 * @param {Object} source whose properties will extend target
 * @returns {Object} target extended by source
 */
Karma.extend = function (target, source) {
    for (var i in source) {
        if (source.hasOwnProperty(i)) {
            target[i] = source[i];
        }
    }
    return target;
};

/**
 * Shuffles an array of items randomly
 * @param {Array} array of choices to be shuffled
 * @returns {Array} an new array which contains the elements of array, shuffled
 */
Karma.shuffle = function (array) {
    var result = array.slice(0);
    for (var i = result.length - 1; i > 0; i -= 1) {
        var j = Karma.rand(0, i);
        var t = result[i];
        result[i] = result[j];
        result[j] = t;
    }
    return result;
};

/**
 * Converts a number to numerals in the specified locale. Currently only
 * supports Nepali
 * @param {Number} Number to be converted
 * @param {locale} locale that number should be converted to
 * @returns {String} Unicode string for localized numeral
 */
Karma.convertNumToLocale = function (num, locale) {
    // TBD: do something with locale...
    var convertDigit = function (digit) {
        return '०१२३४५६७८९'[digit];
    };
    return num.toString().split('').map(convertDigit).join('');
};

/**
 * @name Karma._n
 * @function
 * @public
 * Alias for Karma.convertNumToLocale.
 * */
Karma._n = Karma.convertNumToLocale;

/*
 * Scales the dimensions of document.body to the innerHeight and innerWidth
 * of the viewport, i.e. browser window, with a minor offset to the height to
 * make sure the scrollbars do not appear
 */
Karma.scaleToViewport = function () {
    var width = window.innerWidth;
    var height = window.innerHeight;
    //hack to ensure scrollbars don't appear
    if (height === 900) {
        height = '' + 900 + 'px';
    } else {
        height = '' + (height - 13) + 'px';
    }
    document.body.style.width = '' + width + 'px';
    document.body.style.height = height;
};

// Geometry and math helper methods
/**
 * Converts a value from degrees to radians.
 * @param {Number} angle The angle in degrees
 * @returns {Number} The angle in radians
 */
Karma.radians = function (angle) {
    return (angle / 180) * Math.PI;
};

/**
 * Returns a random integer within the range provided
 * @param {Number} lower limit of the range, lowest number that can be returned
 * @param {Number} upper limit of the range, highest number that can be returned
 * @returns {Number} an integer that is >= lower and <= upper
 */
if (document.location.search == '?test=true') {
    // For testing we want to generate always the same sequence of
    // random numbers.
    (function () {
         // Return a pseudo-random 32 bit integer.
         // From http://en.wikipedia.org/wiki/Random_number_generation
         var random = (function (m_w, m_z) {
                           return function () {
                               m_z = 36969 * (m_z & 65535) + (m_z >>> 16);
                               m_w = 18000 * (m_w & 65535) + (m_w >>> 16);
                               return (m_z << 16) + m_w;
                           };
                       })(1, 2);
         Karma.rand = function (lower, upper) {
             return lower + Math.abs(random()) % (upper - lower + 1);
         };
     })();
} else {
    // Otherwise use Math.random()
    Karma.rand = function (lower, upper) {
        return Math.floor(Math.random() * (upper - lower + 1) + lower);
    };
}

Karma.extend(
    Karma,
    {
        image: {},
        audio: {},
        _initialized: false,
        _statusDiv: undefined,
        _loaderDiv: undefined,
        _counters: { total: 0, errors: 0, loaded: 0},

        _init: function (options) {
            this._initialized = true;

            this._statusDiv = $(document.createElement('div'))
                .attr('id', 'karma-status')
                .css('position', 'absolute')
                .append('Karma is loading...')
                .append(this._loaderDiv = $(document.createElement('div'))
                        .attr('id', 'karma-loader')
                        .addClass('status'))
                .append($(document.createElement('ol'))
                        .attr('id', 'errorList'))
                .appendTo($('body'));

            var that = this;
            var processAssetsOption = function (kind, x) {
                if (!(x instanceof Array)) {
                    throw new Error(kind + ' must be an array');
                }
                Karma._makeCollection(x, kind);
            };
            var option_handlers = {
                image: processAssetsOption,
                audio: processAssetsOption
            };

            for (var option in options) {
                if (option in option_handlers) {
                    option_handlers[option](option, options[option]);
                }
            }
            return this;
        },
        ready_callback: null,
        maybe_ready: function () {
           if (this._counters.loaded == this._counters.total) {
               if (this.ready_callback) {
                   this._statusDiv.remove();
                   this.ready_callback();
               }
           }
        },
        /** Waits until all assets loaded, then calls callback cb
         * @memberOf Karma
         * @param {Function} [cb] callback function
         * @returns this
         * @throws {Error} if Karma is not initialized with the
         * Karma({ options }) function
         */
        ready: function (cb) {
            var that = this;
            this.ready_callback = cb;
            if (Karma._initialized !== true) {
                throw new Error('Karma not initialized');
            }
            this.maybe_ready();
            return this;
        },
        _updateStatus: function (error_msg) {
            var loaded = this._counters.loaded;
            var total = this._counters.total;
            var errors = this._counters.errors;
            this._loaderDiv
                .empty()
                .append('Loaded ' + loaded + ' / ' + total +
                        '' + (errors > 0 ? ' Errors [ ' + errors +' ]' : ''));
            if (error_msg) {
                $('#errorList')
                    .append($(document.createElement('li'))
                            .append(error_msg));
            }
        }
    });

Karma._makeCollection = function (configs, type) {
    var makeAsset = function (config) {
        var classes = {
            image: Karma.kImage,
            audio: Karma.kAudio
        };
        var asset = Karma.create(classes[type])._init(config);
        Karma[type][config.name] = asset;
    };
    configs.forEach(makeAsset);
};

// Prototype objects for assets
Karma.kAsset = {
    /** file location of asset
     * @type String
     * @default ''
     */
    file: '',
    /** media object
     * @type Image
     * @default undefined
     */
    media: undefined,
    //actual path to the file
    _path: '',
    _asset_class: null,
    _ok_event: '',
    _init: function (options) {
        Karma._counters.total++;

        if (options.name === undefined || options.file === undefined) {
            throw new Error('properties name and file have to be defined');
        } else {
            this.name = options.name;
            this.file = options.file;
        }

        this.media = new this._asset_class();
        this.media.src = this.src = this.file; // Load the file.

        this._addEventHandlers();

        return this;
    },
    _addEventHandlers: function () {
        var that = this;
        that.media.addEventListener(
            this._ok_event_name,
            function (e) {
                Karma._counters.loaded++;
                Karma._updateStatus();
                Karma.maybe_ready();
                that.status = 'loaded';
            },
            false);
        that.media.addEventListener(
            'error',
            function (e) {
                Karma._counters.errors++;
                that.status = 'error';
                var errorMsg = 'Error: ' + that._type.toUpperCase() +
                    ' ' + that.name + ' cannot be loaded.';
                Karma._updateStatus(errorMsg);
            },
            false);
        that.media.addEventListener(
            'abort',
            function (e) {
                Karma._counters.total++;
                that.status = 'aborted';
                var errorMsg = 'ABORT: ' + that._type.toUpperCase() +
                    ' ' + that.name + ' loading was aborted.';
                Karma._updateStatus(errorMsg);
            },
            false);
    }
};

/** Prototype object for images
 *  @class This object is the prototype for images submitted to Karma in the
 *  Karma() method
 *  @ throws {Error} if the name and file properties are not supplied
 *  @example
 *  kImage is the prototype object for images. This 'media' asset is loaded
 *  in a distinctly different way from the canvas or svg assets.
 *
 */
Karma.kImage = Karma.create(
    Karma.kAsset,
    {
        _type: 'image',
        _asset_class: Image,
        _ok_event_name: 'load'
    });
	
/** Prototype object for audio files
 *  @class This object is the prototype for audio files submitted to Karma in the
 *  Karma() method
 *  @ throws {Error} if the name and file properties are not supplied
 *  @example
 *  kAudio is the prototype object for audio
 *  The audio assets are loaded in a distinctly different way
 *  from the canvas or svg assets. They also have distinctly different
 *  helper methods
 *
 *  You initialize the kAudio assets by passing an array of objects
 */

if (typeof(window.runtime) != "undefined"){
	
	Karma.kAudio = Karma.create(
		Karma.kAsset,
		{
			_type: 'audio',
			_asset_class: window.runtime.flash.media.Sound,
			_init: function (options) {
				
				Karma._counters.total++;
				if (options.name === undefined || options.file === undefined) {
					throw new Error('properties name and file have to be defined');
				} else {
					this.name = options.name;
					this.file = options.file;
				}
				this.media = new this._asset_class();
				this._addEventHandlers();
				
				var request = new window.runtime.flash.net.URLRequest(this.file);
				this.media.load(request);
				
				return this;
			},
			_ok_event_name: window.runtime.flash.events.Event.COMPLETE,
			play: function () {
				this.media.play();
			}
		});
	
} else {
	 
	Karma.kAudio = Karma.create(
		Karma.kAsset,
		{
			_type: 'audio',
			_asset_class: Audio,
			_init: function (options) {
				var result = Karma.kAsset._init.apply(this, [options]);
				result.media.autobuffer = true;
				result.media.load();
				return result;
			},
			//'canplaythrough' event is a Browser Hack recommended by chromium devs
			//http://code.google.com/p/chromium/issues/detail?id=20251&q=loading%20audio&colspec=ID%20Stars%20Pri%20Area%20Type%20Status%20Summary%20Modified%20Owner%20Mstone%20OS#c4
			_ok_event_name: 'canplaythrough',
			/** Plays the audio file  */
			play: function () {
				this.media.play();
			}
		});
}