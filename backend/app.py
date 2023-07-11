from flask import Flask, jsonify, request
from flask_cors import CORS  # Import the CORS module

app = Flask(__name__)
CORS(app)  # Add CORS support to your Flask app


menu = [
    {
        'id': 1,
        'name': 'Burger',
        'price': 10.99,
        'available': True
    },
    {
        'id': 2,
        'name': 'Pizza',
        'price': 15.99,
        'available': True
    },
    # Add more menu items
]

orders = []

@app.route('/')
def home():
    return "Welcome to Zesty Zomato!"

@app.route('/menu', methods=['GET'])
def get_menu():
    return jsonify({'menu': menu})

@app.route('/menu', methods=['POST'])
def add_menu_item():
    data = request.get_json()
    name = data['name']
    price = data['price']
    new_item = {
        'id': len(menu) + 1,
        'name': name,
        'price': price,
        'available': True
    }
    menu.append(new_item)
    return jsonify({'message': 'Menu item added successfully', 'menuItem': new_item})

@app.route('/menu/<int:item_id>', methods=['DELETE'])
def remove_menu_item(item_id):
    for item in menu:
        if item['id'] == item_id:
            menu.remove(item)
            return jsonify({'message': 'Menu item removed successfully'})
    return jsonify({'error': 'Menu item not found'})

@app.route('/menu/<int:item_id>', methods=['PUT'])
def update_menu_item(item_id):
    for item in menu:
        if item['id'] == item_id:
            item['available'] = not item['available']
            return jsonify({'message': 'Menu item updated successfully'})
    return jsonify({'error': 'Menu item not found'})


#  orders

@app.route('/order', methods=['GET'])
def get_orders():
    return jsonify(orders)


@app.route('/order', methods=['POST'])
def create_order():
    data = request.get_json()
    customer_name = data['customerName']
    dish_id = data['dishId']
    for item in menu:
        if item['id'] == dish_id:
            if item['available']:
                new_order = {
                    'orderId': len(orders) + 1,
                    'customerName': customer_name,
                    'dishId': dish_id,
                    'status': 'received'
                }
                orders.append(new_order)
                return jsonify({'message': 'Order placed successfully'})
            else:
                return jsonify({'error': 'This dish is not available'})
    return jsonify({'error': 'Dish not found'})

# @app.route('/order/<int:order_id>', methods=['PUT'])
# def update_order_status(order_id):
#     data = request.get_json()
#     new_status = data['status']
#     for order in orders:
#         if order['orderId'] == order_id:
#             order['status'] = new_status
#             return jsonify({'message': 'Order status updated successfully'})
#     return jsonify({'error': 'Order not found'})



@app.route('/order-status', methods=['PUT'])
def update_order_status():
    order_id = request.json.get('orderId')
    new_status = request.json.get('newStatus')

    for order in orders:
        if order['orderId'] == order_id:
            order['status'] = new_status
            return jsonify({'message': 'Order status updated successfully'})

    return jsonify({'message': 'Failed to update order status'})


if __name__ == '__main__':
    app.run()
