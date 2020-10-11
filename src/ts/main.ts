import './styles.ts'
import hh from 'hyperscript-helpers'
import { h, diff, patch, VNode } from 'virtual-dom'
import createElement from 'virtual-dom/create-element'

const { div, button } = hh(h)

enum MSG {
  ADD,
  SUBTRACT
}

interface View {
  (dispatcher: (msg: MSG) => void, model: number): VNode
}

interface Updater {
  (msg: MSG, model: number): number
}

const view: View = function(dispatch, model) {
  return div([
    div({ className: 'mv2' }, `Count: ${model}`),
    button({
      className: 'pv1 ph2 mr2', onclick: () => dispatch(MSG.ADD) 
    },  '+'),
    button({
      className: 'pv1 ph2', onclick: () => dispatch(MSG.SUBTRACT)
    }, '-')
  ])
}

const updater: Updater = function(msg: MSG, model: number) {
  switch(msg) {
    case MSG.ADD:
      return model + 1
    case MSG.SUBTRACT:
      return model - 1
    default:
      return model
  }
}

/**
 * Application entry point.
 * 
 * @remarks
 * Mutation happens here.
 * @param initModel [number] - Counter starting number
 * @param update [Updater] - the updator function to be used by the dispatcher
 * @param view [View] - View genearator function
 * @param node [HTMLElement] - the DOM root
 */
function app(initModel: number, update:Updater, view: View, node: HTMLElement) {
  let model = initModel
  let currentView = view(dispatch, model)
  let rootNode = createElement(currentView)
  node.appendChild(rootNode)

  function dispatch(msg: MSG) {
    model = update(msg, model)
    const newView = view(dispatch, model)
    const patches = diff(currentView, newView)
    rootNode = patch(rootNode, patches)
    currentView = newView
  }
}

const root = document.getElementById('app')!
const initialState = 0

app(initialState, updater, view, root)
