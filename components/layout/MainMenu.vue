<template>
    <ul class="nav nav-underline">
        <li class="nav-item">
            <NuxtLink 
                to="/"
                class="nav-link text-white" 
                active-class="active"
            >
                Dashboard</NuxtLink>
        </li>
        <li class="nav-item">
            <NuxtLink 
                to="/current-month"
                class="nav-link text-white" 
                active-class="active"
            >
                Current month</NuxtLink>
        </li>
        <li class="nav-item">
            <NuxtLink 
                to="/yearly-overview"
                class="nav-link text-white" 
                active-class="active"
            >
                Yearly overview</NuxtLink>
        </li>
        <li class="nav-item">
            <NuxtLink 
                to="/savings"
                class="nav-link text-white" 
                active-class="active"
            >
                Savings</NuxtLink>
        </li>
        <li class="nav-item">
            <NuxtLink 
                to="/entries"
                class="nav-link text-white" 
                active-class="active"
            >
                Entries</NuxtLink>
        </li>
        <li class="nav-item">
            <NuxtLink 
                to="/cards"
                class="nav-link text-white" 
                active-class="active"
            >
                Cards</NuxtLink>
        </li>
    </ul>
    <br/>
</template>