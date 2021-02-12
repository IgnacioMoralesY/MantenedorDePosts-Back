const pool = require('../database');

const postController = {
	getPosts: function(req, res){
		pool.query('SELECT * FROM posts')
		.then(response => {
			return res.status(200).json(response.rows);
		})
		.catch(err => res.status(500).send({
			message: 'Error interno del servidor'
		}));
	},
	createPost: function(req, res){
		let {name, description} = req.body;

		if(!name || !description){
			return res.status(504).send({
				message: "Error, No se han enviado los datos al servidor"
			});	
		}

		pool.query('SELECT * FROM posts WHERE name = $1', [name])
			.then(response => {
				if(response.rows.length > 0){
					return res.status(401).send({
						message: 'Post ' + name + ' ya existe. Post Repetido'
					})
				}else{
					pool.query('INSERT INTO posts(name, description) values($1, $2) RETURNING*', [name, description])
						.then(resp => {			
							return res.status(200).json(resp.rows[0]);
						})
						.catch(err => res.status(500).send({
							message: 'Error interno del servidor'
						}));
				}
			})
			.catch(err => res.status(500).send({
				message: 'Error interno del servidor'
			}));
	},
	deletePost: function(req, res){
		let postId = req.params.id;
		if(postId == null ) {
			return res.status(404).send({
				message: "El id esta vacio."
			});	
		}

		pool.query('DELETE FROM posts WHERE id = $1 RETURNING*', [postId])
		.then(response => {		
			return res.status(200).json(response.rows[0]);
		})
		.catch(err => res.status(500).send({
			message: 'Error interno del servidor'
		}));
	}
}

module.exports = postController;