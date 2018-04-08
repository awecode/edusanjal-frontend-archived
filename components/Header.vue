<template>
    <nav class="navbar is-primary">
        <div class="navbar-brand">
            <a class="navbar-item" href="/">
                <img src="~/static/logo.svg" alt="">
                edusanjal
            </a>
            <div class="navbar-burger burger" data-target="navMenuColorprimary-example">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
        <div id="navMenuColorprimary-example" class="navbar-menu">
            <div class="navbar-start">
                <a class="navbar-item" href="/">
                    Home
                </a>
                <div class="navbar-item has-dropdown is-hoverable">
                    <a class="navbar-link" href="/documentation/overview/start/">
                        Docs
                    </a>
                    <div class="navbar-dropdown">
                        <a class="navbar-item" href="/documentation/overview/start/">
                            Overview
                        </a>
                        <a class="navbar-item" href="/documentation/modifiers/syntax/">
                            Modifiers
                        </a>
                        <a class="navbar-item" href="/documentation/columns/basics/">
                            Columns
                        </a>
                        <a class="navbar-item" href="/documentation/layout/container/">
                            Layout
                        </a>
                        <a class="navbar-item" href="/documentation/form/general/">
                            Form
                        </a>
                        <hr class="navbar-divider">
                        <a class="navbar-item" href="/documentation/elements/box/">
                            Elements
                        </a>
                        <a class="navbar-item is-active" href="/documentation/components/breadcrumb/">
                            Components
                        </a>
                    </div>
                </div>
            </div>

            <div class="navbar-end">
                <a class="navbar-item" href="#">
                    Home
                </a>
                <a class="navbar-item" href="#">
                    Home
                </a>
                <a class="navbar-item" href="#">
                    Home
                </a>
                <a class="navbar-item" href="#">
                    Home
                </a>
            </div>
        </div>
    </nav>
</template>