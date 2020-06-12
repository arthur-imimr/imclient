import React, { useState, useEffect } from 'react';
import { ReactMic } from 'react-mic';
import {useSelector,useDispatch} from 'react-redux';
import {addMessage} from '../../actions/messagesAction';


export const PressToTalkButton = () => {
    const socket = useSelector(state => state.personal.socket);
    const chatId = useSelector(state => state.personal.chatId);
    const id = useSelector(state => state.personal.id);
    const dispatch = useDispatch();

    const [isRecording, setRecording] = useState({
        mic: false,
        voice: false,
    });

    const startRecording = () => {
        setRecording({
            ...isRecording,
            mic: true
        });
    }

    useEffect(() => {
        if (isRecording.mic) {
            setRecording({
                ...isRecording,
                voice: true
            });
        }
    }, [isRecording.mic]);

    useEffect(() => {
        if (!isRecording.voice) {
            setRecording({
                ...isRecording,
                mic: false,
            });
        }
    }, [isRecording.voice]);

    const stopRecording = () => {
        setRecording({
            ...isRecording,
            voice: false,
        });
    }

    const saveData = (function () {
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        return function (data, fileName) {
            const url = window.URL.createObjectURL(data);
            a.href = url;
            a.download = fileName;
            a.click();
            window.URL.revokeObjectURL(url);
        };
    }());

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
    
    const onStop = async (blob) => {
        console.log('proccing emit');
        const data = await toBase64(blob.blob);
        console.log(chatId);
        socket.emit('addAudio', {roomId: chatId, data});
        dispatch(addMessage({
            id: id,
            userId: id,
            roomId: chatId,
            content: data,
            createdAt: Date.now().toString()
        }));
        console.log(data);
    }

    return (
        <div>
            <button onMouseUp={() => {
                    stopRecording();
                }}
                onMouseDown={() => {
                    startRecording();
                }}
                >{isRecording.mic ? "release to stop recording" : "hold to start recording"}
            </button>
            <div>
            {
                isRecording.mic && (
                    <ReactMic
                        mimeType="audio/wav"
                        record={isRecording.voice}
                        onStop={onStop}
                    />
                )
            }
            </div>
        </div>
    );
}