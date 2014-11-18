'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Article Schema
 */
var ArticleSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
    nome: {
		type: String,
		default: '',
		trim: true,
		required: 'Title cannot be blank'
	},
	descricao: {
		type: String,
		default: '',
		trim: true
	},
    responsavel: {
        responsavelId: {
            type: Schema.ObjectId,
		    ref: 'User',
            trim: true,
		    required: 'O id do responsavel deve ser inserido!'
	    },
        username: {
            type: String,
            required: 'O username do responsavel deve ser informado!'
        }
    },
    dtInicio: {
		type: String,
		default: '',
		trim: true
	},
    dtTermino: {
		type: String,
		default: '',
		trim: true
	},
    
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Article', ArticleSchema);