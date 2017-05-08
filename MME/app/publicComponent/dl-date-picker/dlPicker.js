/**
 * Created by dingle on 2017/3/31.
 */
import React, {Component, PropTypes}from 'react';

import {
    View,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    InteractionManager,
    Platform
} from 'react-native';

class DLPicker extends Component {

    constructor(props) {
        super(props);
        this.state = {
            scrollIndexF: 0.0
        }
    }

    static propTypes = {
        data: PropTypes.array,
        itemHeight: PropTypes.number.isRequired,
        onSelectedItem: PropTypes.func.isRequired,
        selectedIndex: PropTypes.number
    };


    componentDidMount() {
        this.scrollToIndex(this.props.selectedIndex);
    }

    scrollToIndex(selectedIndex) {
        let contentOffsetY = (selectedIndex) * this.props.itemHeight;

        InteractionManager.runAfterInteractions(() => {
            // ...需要长时间同步执行的任务...
            this._scrollView.scrollTo({x: 0, y: contentOffsetY, animated: true});

        });
    }

    render() {

        var items = this.loadHolderViews();
        items.push(this.props.data.map((data, index) => {
            let dif = Math.abs(index - this.state.scrollIndexF);
            let itemOpacity = 1 - dif * 0.2;
            let scale = 1 - dif * 0.1;

            return (
                <View key={index} style={[styles.itemStyle, {height: this.props.itemHeight, opacity: itemOpacity}]}>
                    <Text style={[styles.itemLabelStyle, {transform: [{scale: scale}]}]}>{data.label}</Text>
                </View>
            )
        }));

        items.push(this.loadHolderViews());

        return (
            <ScrollView ref={(scrollView) => {
                this._scrollView = scrollView
            }}
                       // style={styles.container}
                        //contentContainerStyle={styles}
                        onScroll={this._onScroll.bind(this)}
                        scrollEventThrottle={50}
                        showsVerticalScrollIndicator={false}
                        snapToInterval={this.props.itemHeight}
                        snapToAlignment={'center'}
                        onMomentumScrollEnd={this._onMomentumScrollEnd.bind(this)}
                        onScrollEndDrag={this._onScrollEndDrag.bind(this)}
            >
                {items}
            </ScrollView>
        )

    }

    loadHolderViews() {
        let views = [1, 2, 3].map((v, i) => {
            return (
                <View key={i} style={[styles.itemStyle, {height: this.props.itemHeight}]}/>
            )
        })

        return views;
    }

    _onScroll(e) {
        let contentOffsetY = e.nativeEvent.contentOffset.y;
        let scrollHeight = e.nativeEvent.layoutMeasurement.height;
        let itemHeight = this.props.itemHeight;
        let itemIndexF = (contentOffsetY + scrollHeight * 0.5 - itemHeight * 0.5) / itemHeight - 3;
        this.setState({
            scrollIndexF: itemIndexF
        });
    }


    _onMomentumScrollEnd(e) {
        this.scrollEndTodo(e);
    }

    _onScrollEndDrag(e) {
        if (Platform.OS == 'android') {
            this.scrollEndTodo(e);
        }
    }

    scrollEndTodo(e) {
        let itemHeight = this.props.itemHeight;
        let itemIndex = Math.round(e.nativeEvent.contentOffset.y / itemHeight);

        if (Platform.OS == 'android') {
            this._scrollView.scrollTo({x: 0, y: itemIndex * itemHeight, animated: true});
        }
        if (itemIndex < this.props.data.length) {
            let itemData = this.props.data[itemIndex];
            this.props.onSelectedItem(itemData);
        }


    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },

    itemStyle: {
        borderColor: '#000000',
        justifyContent: 'center'
    },
    itemLabelStyle: {
        fontSize: 20,
        color: '#121212',
        textAlign: 'center'
    }


});

export default DLPicker