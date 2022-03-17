import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';

const ChatRoom = function (data) {
  const defaultDate = '2022.01.18';
  console.log('in chatRoom', data);
  return (
    <View style={chatRoomStyles.chatRoomContainer}>
      <View>
        <View style={chatRoomStyles.statusBackground} />
        <View style={chatRoomStyles.status} />
      </View>
      <View style={chatRoomStyles.information}>
        <Text style={chatRoomStyles.title}>{data.name}</Text>
        <Text style={chatRoomStyles.createdDat}>
          {data.createdDate ?? defaultDate}
        </Text>
      </View>
      <TouchableOpacity style={chatRoomStyles.joinBtn} onPress={() => {}}>
        <Text style={chatRoomStyles.joinBtnTxt}>참가</Text>
      </TouchableOpacity>
    </View>
  );
};

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [room, setRoom] = useState([]);
  const [pageNum, setPageNum] = useState(0);

  const host = 'http://2177-211-35-233-150.ngrok.io';
  const port = '';

  const increasePageNum = () => {
    if (pageNum === 1) {
      setPageNum(0);
    } else {
      setPageNum(pageNum + 1);
    }
  };

  useEffect(() => {
    getChatRoom();
  }, []);

  const getChatRoom = async () => {
    try {
      const url = host + ':' + port + '/chatrooms';
      const response = await fetch(url);
      const json = await response.json();
      setRoom(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const Login = () => {
    return (
      <View style={loginStyles.container}>
        <Text>a</Text>
        <Text>b</Text>
        <TextInput />
        <TouchableOpacity
          style={chatRoomStyles.joinBtn}
          onPress={increasePageNum}>
          <Text style={chatRoomStyles.joinBtnTxt}>참가</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View>
          {pageNum === 0 ? (
            <Login />
          ) : (
            <FlatList
              data={room}
              renderItem={({item}) => <ChatRoom {...item} />}
            />
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

const chatRoomStyles = StyleSheet.create({
  header: {
    color: '#2C3A4B',
    fontSize: 20,
    lineHeight: 30,
    fontWeight: '600',
    marginLeft: 16,
    marginBottom: 20,
  },
  listContainer: {
    margin: 24,
  },
  chatRoomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    marginBottom: 20,
  },
  statusBackground: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 56,
    height: 56,
    backgroundColor: '#6D5FFD',
    borderRadius: 16,
    opacity: 0.1,
    marginRight: 16,
  },
  status: {
    position: 'absolute',
    width: 16,
    height: 16,
    marginTop: 20,
    marginLeft: 20,
    backgroundColor: '#6D5FFD',
    borderRadius: 16,
  },
  information: {
    marginRight: 80,
  },
  title: {
    color: '#2C3A4B',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  date: {
    fontSize: 11,
    lineHeight: 16,
  },
  joinBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 89,
    height: 37,
    borderWidth: 2,
    borderColor: '#6D5FFD',
    borderRadius: 6,
    backgroundColor: '#fff',
  },
  joinBtnTxt: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6D5FFD',
  },
});

const loginStyles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  nicknameLabel: {
    color: '#2C3A4B',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  nicknameInput: {
    width: 360,
    height: 48,
    borderWidth: 1,
    borderColor: '#A5ABB3',
    borderRadius: 8,
  },
  submitBtn: {
    backgroundColor: 'red',
  },
});

export default App;
