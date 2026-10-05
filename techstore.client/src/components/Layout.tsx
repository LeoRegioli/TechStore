import { Outlet, NavLink } from "react-router-dom";
import {
    makeStyles,
    Button,
    tokens
} from "@fluentui/react-components";
import { Box24Regular, Tag24Regular } from "@fluentui/react-icons";

const useStyles = makeStyles({
    layout: {
        display: "flex",
        minHeight: "100vh"
    },
    sidebar: {
        width: "220px",
        padding: "20px",
        backgroundColor: tokens.colorNeutralBackground2,
        borderRight: `1px solid ${tokens.colorNeutralStroke1}`
    },
    menu: {
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        marginTop: "24px"
    },
    content: {
        flexGrow: 1,
        minWidth: 0,
        paddingTop: "24px",
        paddingRight: "24px",
        paddingBottom: "24px",
        paddingLeft: "12px",
    },
    menuButton: {
        width: "100%",
        justifyContent: "flex-start",
    },
    link: {
        textDecoration: "none",
        width: "100%",
    }
});

export function Layout() {
    const styles = useStyles();

    return (
        <div className={styles.layout}>
            <aside className={styles.sidebar}>
                <h2>TechStore</h2>

                <nav className={styles.menu}>
                    <NavLink
                        to="/produtos"
                        className={styles.link}
                    >
                        {({ isActive }) => (
                            <Button
                                icon={<Box24Regular />}
                                className={styles.menuButton}
                                appearance={isActive ? "primary" : "subtle"}
                            >
                                Produtos
                            </Button>
                        )}
                    </NavLink>

                    <NavLink
                        to="/categorias"
                        className={styles.link}
                    >
                        {({ isActive }) => (
                            <Button
                                icon={<Tag24Regular />}
                                className={styles.menuButton}
                                appearance={isActive ? "primary" : "subtle"}
                            >
                                Categorias
                            </Button>
                        )}
                    </NavLink>
                </nav>
            </aside>

            <main className={styles.content}>
                <Outlet />
            </main>
        </div>
    );
}