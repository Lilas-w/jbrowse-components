const express = require('express')
const { Sequelize, DataTypes } = require('sequelize')

const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql',
})

const Clusters = sequelize.define('Clusters', {
  name: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  percentage: {
    type: DataTypes.STRING,
    allowNull: true,
  },
})

sequelize
  .sync()
  .then(() => {
    console.log('Database synchronized')
  })
  .catch(error => {
    console.error('Error synchronizing database:', error)
  })

const app = express()

app.get('/clusters', (req, res) => {
  Clusters.findAll()
    .then(Clusters => {
      res.json(Clusters)
    })
    .catch(error => {
      console.error('Error fetching users:', error)
      res.status(500).json({ error: 'Internal server error' })
    })
})

app.post('/clusters', (req, res) => {
  const { name, percentage } = req.body

  Clusters.create({ name, percentage })
    .then(cluster => {
      res.json(cluster)
    })
    .catch(error => {
      console.error('Error creating user:', error)
      res.status(500).json({ error: 'Internal server error' })
    })
})

// Other routes...

app.listen(3000, () => {
  console.log('Server started on port 3000')
})
