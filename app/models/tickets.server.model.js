var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var TicketSchema = new Schema({
	creado: {
		type: Date,
		default: Date.now
	},
	ticketId: {
		type: Number,
		required: 'Id del ticket es obligatorio'
	},
	tiempo: {
		type: Number,
		required: 'Tiempo invertido en el ticket es obligatorio'
	},
	tipo: {
		type: String,
		required: 'Tipo del ticket es obligatorio'
	},
	estado: {
		type: String,
		required: 'Tipo del ticket es obligatorio'
	},
	sendto: {
		type: String,
		required: 'Tipo del ticket es obligatorio'
	},
	creador: {
		type: Schema.ObjectId,
		ref:'User'
	}
});

mongoose.model('Ticket',TicketSchema);