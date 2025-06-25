'use client';
import Link from "next/link";
import { IconType } from "react-icons";
import { ActionButton } from "../Shared/ActionButton";
import { socials } from "./Constants/Data";

interface SocialsProps {
    profile: ProfileProps;
}

export function Socials({ profile }: SocialsProps) {
    return (
        <>
            {socials.map(({ label, icon: Icon, hrefPrefix }) => {
                const username = profile[label];
                const isDisabled = !username;

                return (
                    <Link
                        key={label}
                        href={isDisabled ? "#" : (username.startsWith("http") ? username : `${username}`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={e => isDisabled && e.preventDefault()}
                        className={`
    ${isDisabled ? "cursor-not-allowed pointer-events-none" : "cursor-pointer"}
  `}
                    >
                        <ActionButton className="rounded-md" disabled={isDisabled}>
                            <Icon size={20} />
                        </ActionButton>
                    </Link>

                );
            })}
        </>
    )
}