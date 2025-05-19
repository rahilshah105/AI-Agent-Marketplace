import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth, useUser } from "@clerk/clerk-react";
import humanizeDuration from "humanize-duration";

export const AppContext = createContext()

export const AppContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const currency = import.meta.env.VITE_CURRENCY

    const navigate = useNavigate()
    const { getToken } = useAuth()
    const { user } = useUser()

    const [showLogin, setShowLogin] = useState(false)
    const [isCreator, setIsCreator] = useState(false)
    const [allAgents, setAllAgents] = useState([])
    const [userData, setUserData] = useState(null)
    const [agentRuns, setAgentRuns] = useState([])

    // Fetch All Agents
    const fetchAllAgents = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/agent/all');
            if (data.success) {
                setAllAgents(data.agents)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    // Fetch User Data
    const fetchUserData = async () => {
        try {
            if (user?.publicMetadata?.role === 'creator') {
                setIsCreator(true)
            }

            const token = await getToken();
            const { data } = await axios.get(backendUrl + '/api/user/data',
                { headers: { Authorization: `Bearer ${token}` } })

            if (data.success) {
                setUserData(data.user)
            } else {
                toast.error(data.message)
                 console.log("API Error:", data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    // Fetch Executed Agents for User
    const fetchUserAgentRuns = async () => {
        try {
            const token = await getToken();
            const { data } = await axios.get(backendUrl + '/api/user/executions',
                { headers: { Authorization: `Bearer ${token}` } });

            if (data.success) {
                setAgentRuns(data.executions.reverse())
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const calculateRating = (agent) => {
        if (!agent.agentRatings?.length) return 0
        const total = agent.agentRatings.reduce((acc, val) => acc + val.rating, 0)
        return Math.floor(total / agent.agentRatings.length)
    }

    useEffect(() => {
        fetchAllAgents()
    }, [])

    useEffect(() => {
        if (user) {
            fetchUserData()
            // fetchUserAgentRuns()
        }
    }, [user])

    const value = {
        showLogin, setShowLogin,
        backendUrl, currency, navigate,
        userData, setUserData, getToken,
        allAgents, fetchAllAgents,
        agentRuns, fetchUserAgentRuns,
        calculateRating,
        isCreator, setIsCreator
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}
