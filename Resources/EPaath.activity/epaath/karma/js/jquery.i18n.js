/* Copyright Bryan W Berry, 2009,
* under the MIT license http://www.opensource.org/licenses/mit-license.php
*
* this library is heavily influenced by the GNU LIBC library
*  http://www.gnu.org/software/libc/manual/html_node/Locales.html
*/

(function($){
    $.i18n = {
		lang: "en",
        defaultLocale: {
			date : 'dd/mm/yy',
			monetary: 'nnn,nnn.nn',
			currency: '$',
			numeralBase : 48,
			numeralPrefix: "u00"
		},
		defaultContext: 'default',
		locales: {},
		localeStrings: {},

        setup: function(){
            $.i18n.locales = {en: $.i18n.defaultLocale};
        },
	
		storeLocale: function(locale_id, locale_def){
			$.i18n.locales[locale_id] = $.extend( locale_def, $.i18n.defaultLocale );
		},
		
		_keyContext: function( key, context ){
			if ( context == null ){
				context = $.i18n.defaultContext;
			}
			var stringContext = context;
			var dot = key.indexOf('.');
			//if ( dot > 0 ){
			//	stringContext = key.substring(0, dot);
			//	key = key.substring(dot);
			//}
			return [key, stringContext];
		},
	
		storeLocaleStrings: function(locale_id, strings, context){
			if ( typeof($.i18n.localeStrings[locale_id]) == "undefined" ){
				$.i18n.localeStrings[locale_id] = {};
			}

            var keys = objKeys(strings);
            if ( keys.length == 1 && keys[0] == 'strings' ){
                strings = strings['strings']
                keys = objKeys(strings);
            }
			
			for (var i=0; i<keys.length; i++){
                var key = keys[i];
				var keyContext = $.i18n._keyContext(key, context);
				
				var storeKey = keyContext[0];
				var storeContext = keyContext[1];
				
                if ( typeof($.i18n.localeStrings[locale_id][storeKey]) == "undefined" ){
                    $.i18n.localeStrings[locale_id][storeKey] = {};
                }
				$.i18n.localeStrings[locale_id][storeKey][storeContext] = strings[key];
			}

		},
		
		setLocale: function (locale){
            $.i18n.lang = locale;
		},

		getLocale: function (){
			return $.i18n.lang;
		},
		
		getString: function( key, locale, context ){
			var keyContext = $.i18n._keyContext(key, context);
				
			var readKey = keyContext[0];
			var readContext = keyContext[1];

			
			if ( typeof($.i18n.localeStrings[locale]) == "undefined" ||
				typeof($.i18n.localeStrings[locale][readKey]) == "undefined" ){
				return false;
			}
			
			// try for our target context
			if ( typeof($.i18n.localeStrings[locale][readKey][readContext]) != "undefined" ){
				return $.i18n.localeStrings[locale][readKey][readContext];
			}
			// or the default context
			if ( readContext != $.i18n.defaultContext && typeof($.i18n.localeStrings[locale][readKey][$.i18n.defaultContext]) != "undefined" ){
				return $.i18n.localeStrings[locale][readKey][$.i18n.defaultContext];
			}
			
			// just return the first string for this key
			for ( contextKey in $.i18n.localeStrings[locale][readKey] ){
				return $.i18n.localeStrings[locale][readKey][contextKey];
			}
		},
	
		gettext: function(string, locale){
			locale = locale || $.i18n.lang;
			
			var translatedString = $.i18n.getString(string, locale);
			if (translatedString === false){
				return string;
			}
			return translatedString;
		},

		cgettext: function(context, string, locale){
			locale = locale || $.i18n.lang;
			
			var translatedString = $.i18n.getString(string, locale, context);
			if (translatedString === false){
				return string;
			}
			return translatedString;
		},
		
		// You can override this in messages.<lang>.json.
		choose_pluralized_msg: function (choices, n) {
			return n == 1 ? choices[0] : choices[1];
		},

		ngettext: function (msgid1, msgid2, n) {
			/*if (lang || !$.i18n[lang].strings) {
				return choose_pluralized_msg([msgid1, msgid2], n);
			}
			// Is using msgid1 as the key ok?
			return choose_pluralized_msg(
				$.i18n[lang].strings[msgid1] || [msgid1, msgid2],
				n
			);*/
		},
		
		/**
		* Converts a number to numerals in the specified locale. Currently only
		* supports devanagari numerals for Indic languages like Nepali and Hindi
		* @param {Number} Number to be converted
		* @param {locale} locale that number should be converted to
		* @returns {String} Unicode string for localized numeral
		*/
		getnumber: function(num, locale){
			locale = locale || $.i18n.lang;

			if (!$.i18n.locales[locale] || !$.i18n.locales[locale].numeralBase ){
				return num;
			}

			//48 is the base for western numerals
			var numBase = $.i18n.locales[locale].numeralBase || 48;
			var prefix =  $.i18n.locales[locale].numeralPrefix || "u00";

			var convertDigit = function(digit){
				return '\\' + prefix +
					(numBase + parseInt(digit)).toString(16);
			};

			var charArray = num.toString().split("").map(convertDigit);
				return eval('"' + charArray.join('') + '"');
		}
	}

	$._ = $.i18n.gettext;
	$._c = $.i18n.cgettext;
	$._n = $.i18n.getnumber;

	/* ToDo
	* implement sprintf
	* conversion functions for monetary and numeric
	* sorting functions (collation) for different locales
	*/

})(jQuery);
