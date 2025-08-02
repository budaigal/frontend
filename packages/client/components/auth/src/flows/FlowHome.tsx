import { Match, Show, Switch } from "solid-js";

import { Trans } from "@lingui-solid/solid/macro";
import { cva } from "styled-system/css";

import { useClientLifecycle } from "@revolt/client";
import { TransitionType } from "@revolt/client/Controller";
import { Navigate } from "@revolt/routing";
import { Button, Column } from "@revolt/ui";

import BrandSvg from "../../../../public/assets/spacebar_wordmark.svg?component-solid";

const logo = cva({
  base: {
    width: "100%",
    objectFit: "contain",
    fill: "var(--colours-messaging-message-box-foreground)",
  },
});

/**
 * Flow for logging into an account
 */
export default function FlowHome() {
  const { lifecycle, isLoggedIn, isError } = useClientLifecycle();

  return (
    <Switch
      fallback={
        <>
          <Show when={isLoggedIn()}>
            <Navigate href="/app" />
          </Show>

          <Column gap="xl">
            <BrandSvg class={logo()} />

            <Column>
              <b
                style={{
                  "font-weight": 800,
                  "font-size": "1.4em",
                  display: "flex",
                  "flex-direction": "column",
                  "align-items": "center",
                  "text-align": "center",
                }}
              >
                <span>
                  <Trans>
                    Find your com
                    <wbr />
                    munity,
                    <br />
                    connect with the world.
                  </Trans>
                </span>
              </b>
              <span style={{ "text-align": "center", opacity: "0.5" }}>
                <Trans>
                  Круг гусляров-один из лучших способов оставаться на связи с друзьями и сообществом 
                  в любом месте и в любое время.
                </Trans>
              </span>
            </Column>

            <Column>
              <a href="/login/auth">
                <Column>
                  <Button>
                    <Trans>Log In</Trans>
                  </Button>
                </Column>
              </a>
              <a href="/login/create">
                <Column>
                  <Button variant="secondary">
                    <Trans>Sign Up</Trans>
                  </Button>
                </Column>
              </a>
            </Column>
          </Column>
        </>
      }
    >
      <Match when={isError()}>
        <Switch fallback={"an unknown error occurred"}>
          <Match when={lifecycle.permanentError === "InvalidSession"}>
            <h1>
              <Trans>Вы вышли из учётной записи!</Trans>
            </h1>
          </Match>
        </Switch>

        <Button
          variant="secondary"
          onPress={() =>
            lifecycle.transition({
              type: TransitionType.Dismiss,
            })
          }
        >
          <Trans>OK</Trans>
        </Button>
      </Match>
    </Switch>
  );
}
