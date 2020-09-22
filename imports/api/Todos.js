import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import SimpleSchema from 'simpl-schema'
export const Todos = (globalThis.Todos = new Mongo.Collection('Todos'))
Todos.attachSchema(
  new SimpleSchema({
    title: {
      type: String
    }
  })
)

Todos.allow({
  insert: () => true,
  remove: () => true
})

if (Meteor.isServer) {
  Meteor.publish('Todos', () => Todos.find())
} else {
  Meteor.subscribe('Todos')
}
