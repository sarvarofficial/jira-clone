import type {TabsItem} from "#ui/components/Tabs.vue";
import {EnumStatus} from "~/types";

export const DB_ID="jira-db";
export const DEALS_COL_ID="67ff808100149a82fae5";
export const COMMENTS_COL_ID="67ff82060000742a6e50";

export const tabs: TabsItem[] = [
    {
        label: 'Plan',
        description:
            'Break the big ideas down into manageable chunks across teams with user stories, issues, and tasks.',
        image: '/Board.png',
        credentials: {
            text: "Work becomes a lot more visible when it's all in one place. It makes collaboration a whole lot easier.",
            username: 'JEFF LAI',
            company: 'INTERNAL INFRASTRUCTURE, CANVA',
        },
    },
    {
        label: 'Track',
        description:
            'Prioritize and discuss your team’s work in context with complete visibility at every level.',
        image: '/Timeline.png',
        credentials: {
            text: 'The pace of delivery from idea to reality has exploded.',
            username: 'GREG FRANKLIN',
            company: 'AGILE LEAD, CANCER RESEARCH UK',
        },
    },
    {
        label: 'Release',
        description:
            'Ship faster, with confidence knowing the information you have is always up-to-date.',
        image: '/Releases.png',
        credentials: {
            text: 'Less friction in the development process means better results and a faster time to market.',
            username: 'LOUIS BENNETT',
            company: 'DIRECTOR OF ENGINEERING, TRULIA',
        },
    },
    {
        label: 'Report',
        description:
            'Improve team performance in context, based on real-time, visual data.',
        image: '/Insights.png',
        credentials: {
            text: 'Full visibility in Jira across the whole organization enables you to make better management judgment.',
            username: 'PAUL LEAON',
            company: 'DIGITAL PORTFOLIO DIRECTOR, INCHCAPE',
        },
    },
    {
        label: 'Automate',
        description:
            'Save time, keep your team focused, and help work flow with no-code automation.',
        image: '/Automation.png',
        credentials: {
            text: 'We’re saving 150 hours+ of valuable engineering time per month.',
            username: 'JEFF LAI',
            company: 'INTERNAL INFRASTRUCTURE, CANVA',
        },
    },
]

export const templates = [
    {
        name: 'Scrum',
        image: '/scrum.svg',
    },
    {
        name: 'Kanban',
        image: '/kanban.svg',
    },
    {
        name: 'Bug tracking',
        image: '/bug.svg',
    },
    {
        name: 'DevOps',
        image: '/devops.svg',
    },
]

export const sidebarItems = [
    {
        name: 'Dashboard',
        url: '/documents',
        icon: 'radix-icons:dashboard',
    },
    {
        name: 'Todo',
        url: '/documents/to-do',
        icon: 'ri:todo-fill',
    },
    {
        name: 'In Progress',
        url: '/documents/in-progress',
        icon: 'game-icons:progression',
    },
    {
        name: 'Produced',
        url: '/documents/produced',
        icon: 'eos-icons:product-subscriptions',
    },
    {
        name: 'Done',
        url: '/documents/done',
        icon: 'ic:baseline-cloud-done',
    },

]

export const statuses = [
    {
        status: EnumStatus.todo,
        name: "To do",
        items: []
    },
    {
        status: EnumStatus.inProgress,
        name: "In Progress",
        items: []
    },
    {
        status: EnumStatus.produced,
        name: "Produced",
        items: []
    },
    {
        status: EnumStatus.done,
        name: "Done",
        items: []
    }
]