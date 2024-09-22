import { useState, useMemo, useEffect, useRef } from 'react'
import dayjs from 'dayjs';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Pencil2Icon } from "@radix-ui/react-icons"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"


const PEER_MILLISECONDS_OF_MINUTE = 60 * 1000;

export default function DeadlineCard() {
    const [ready, setReady] = useState(false);
    const [duration, setDuration] = useState(0)
    const [milliseconds, setMilliSeconds] = useState(() => {
        return duration * PEER_MILLISECONDS_OF_MINUTE
    })

    const time = useMemo(() => {
        return dayjs(milliseconds).format('mm:ss')
    }, [milliseconds])

    const timer = useRef(-1)

    useEffect(() => {
        setMilliSeconds(duration * PEER_MILLISECONDS_OF_MINUTE)
    }, [duration])


    useEffect(() => {
        if (ready) {
            // @ts-ignore
            timer.current = setInterval(() => {
                setMilliSeconds((num) => num - 1000)
            }, 1000);
        }
    }, [ready]);


    if (milliseconds == 0) {
        clearInterval(timer.current!)
    }

    return (
        <>
            <Card className='w-[50%]'>
                <CardHeader >
                    <CardTitle className='flex justify-between items-center'>
                        Typein your task name
                        <Dialog>
                            <DialogTrigger><Pencil2Icon className='cursor-pointer' /></DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                                    <DialogDescription>
                                        This action cannot be undone. This will permanently delete your account
                                        and remove your data from our servers.
                                    </DialogDescription>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>
                    </CardTitle>
                    <CardDescription>
                        typein description of your task
                    </CardDescription>
                </CardHeader>


                <CardContent className='flex flex-col items-center'>
                    <div className='text-black text-6xl text-center'>
                        {time}
                    </div>
                    <div className='mt-4 w-[50%] flex items-center gap-1' >
                        <Input disabled={ready} value={duration} onChange={(e) => {
                            const val = e.currentTarget.value.trim()
                            const _duration = Number(val)
                            setDuration(_duration)
                        }} type="number" /> <span className='text-gray text-sm'>minutes</span>
                    </div>
                </CardContent>

                <CardFooter className='flex justify-center gap-4'>
                    <Button disabled={ready || duration == 0} onClick={() => {
                        setReady(true)
                    }}>Start</Button>
                    {ready && <Button variant="destructive" onClick={() => {
                        if (timer.current > -1) {
                            setReady(false)
                            clearInterval(timer.current)
                        }
                    }}>Stop</Button>}
                </CardFooter>
            </Card>
        </>
    )
}
