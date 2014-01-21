'use strict';
/*jshint maxlen:200 */

/**
 *
 * Desc<br />
 *
 * @module gallery-itsamarkermodel
 * @extends Model
 * @class Y.ITSAMarkerModel
 * @since 0.1
 *
 * <i>Copyright (c) 2013 Marco Asbreuk - http://theinternetwizard.net</i>
 * YUI BSD License - http://developer.yahoo.com/yui/license.html
 *
*/

function ITSAMarkerModel() {
    ITSAMarkerModel.superclass.constructor.apply(this, arguments);
}

ITSAMarkerModel.NAME = 'itsamarkermodel';

ITSAMarkerModel.ATTRS = {

    /**
     * Array with all the checked options. The Array is an Array of String-types which are present in 'options' and checked.
     *
     * @attribute checked
     * @type {Array}
     * @default []
     * @since 0.1
     */
    lat: {
        value: 0,
        validator: function(v){ return (typeof v === 'number'); }
    },

    lon: {
        value: 0,
        validator: function(v){ return (typeof v === 'number'); }
    },

    markerClassname: {
        value: null,
        validator: function(v){ return (v===null) || (typeof v === 'string'); }
    },

    markerHeaderTemplate: {
        value: null,
        validator: function(v){ return (v===null) || (typeof v === 'string'); }
    },

    markerBodyTemplate: {
        value: null,
        validator: function(v){ return (v===null) || (typeof v === 'string'); }
    },

    markerFooterTemplate: {
        value: null,
        validator: function(v){ return (v===null) || (typeof v === 'string'); }
    },

    markerText: {
        value: null,
        validator: function(v){ return (v===null) || (typeof v === 'string'); }
    },

    markerVisible: {
        value: true,
        validator: function(v){ return (typeof v === 'boolean'); }
    }

    markerZindex: {
        value: null,
        validator: function(v){ return (v===null) || (typeof v === 'number'); }
    }

};

Y.ITSAMarkerModel = Y.extend(ITSAMarkerModel, Y.Model);

ITSAMessageControllerClass.prototype.toJSON = function() {
    var instance = this,
        tojson = instance.constructor.superclass.toJSON.apply(instance, arguments);
    delete tojson.markerClassname;
    delete tojson.markerHeaderTemplate;
    delete tojson.markerBodyTemplate;
    delete tojson.markerFooterTemplate;
    delete tojson.markerText;
    delete tojson.markerVisible;
    delete tojson.markerZindex;
    return tojson;
}