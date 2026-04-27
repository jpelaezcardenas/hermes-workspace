#!/usr/bin/env python3
"""
Agent Registry Module for SettleMint Office Agents

Provides canonical name resolution and agent detection functionality.
Maps casual/legacy names to canonical agent names.

Usage:
    from agent_registry import resolve_agent, detect_agent, get_acknowledgment
    
    # Resolve an alias to canonical name
    canonical = resolve_agent("proposal builder")  # Returns: "bid-manager"
    
    # Detect agent from message text
    agent = detect_agent("I need to write a proposal response")
    
    # Get acknowledgment message
    ack = get_acknowledgment("bid-manager")  # Returns: "Starting **bid-manager**..."
"""

from __future__ import annotations

import json
import re
from pathlib import Path
from typing import Optional

# Registry path relative to this file
REGISTRY_PATH = Path(__file__).parent.parent / "agent-registry.json"


def _load_registry() -> dict:
    """Load the agent registry from JSON."""
    with open(REGISTRY_PATH, "r", encoding="utf-8") as f:
        return json.load(f)


def resolve_agent(name: str) -> Optional[str]:
    """
    Resolve an agent alias or name to its canonical name.
    
    Args:
        name: Any agent reference (alias, canonical name, or variation)
        
    Returns:
        Canonical agent name or None if not found
        
    Examples:
        >>> resolve_agent("proposal builder")
        'bid-manager'
        >>> resolve_agent("bid-manager")
        'bid-manager'
        >>> resolve_agent("deck checker")
        'ppt-checker'
    """
    registry = _load_registry()
    name_lower = name.lower().strip()
    
    for canonical_name, agent_config in registry.get("agents", {}).items():
        # Direct canonical name match
        if name_lower == canonical_name.lower():
            return canonical_name
        
        # Check aliases
        for alias in agent_config.get("aliases", []):
            if name_lower == alias.lower():
                return canonical_name
            # Also check partial matches for multi-word aliases
            if alias.lower() in name_lower or name_lower in alias.lower():
                return canonical_name
    
    return None


def detect_agent(text: str) -> Optional[str]:
    """
    Detect which agent should handle a given message.
    
    Args:
        text: The message text to analyze
        
    Returns:
        Canonical agent name or None if no match
        
    Examples:
        >>> detect_agent("I need to write a proposal response")
        'bid-manager'
        >>> detect_agent("Can you review this deck?")
        'ppt-checker'
    """
    registry = _load_registry()
    text_lower = text.lower()
    
    # Get priority order
    priority = registry.get("detection_rules", {}).get("priority_order", [])
    
    # Score each agent by keyword matches
    scores = {}
    for canonical_name, agent_config in registry.get("agents", {}).items():
        score = 0
        keywords = agent_config.get("detection_keywords", [])
        
        for keyword in keywords:
            keyword_lower = keyword.lower()
            # Full phrase match is stronger
            if keyword_lower in text_lower:
                score += 2
            # Word match is weaker but still counts
            words = keyword_lower.split()
            for word in words:
                if len(word) > 3 and word in text_lower:  # Only meaningful words
                    score += 1
        
        if score > 0:
            # Apply priority bonus (earlier in list = higher priority)
            priority_bonus = len(priority) - priority.index(canonical_name) if canonical_name in priority else 0
            scores[canonical_name] = score + priority_bonus
    
    if not scores:
        return None
    
    # Return highest scoring agent
    return max(scores, key=scores.get)


def get_acknowledgment(canonical_name: str) -> str:
    """
    Get the acknowledgment message for starting an agent.
    
    Args:
        canonical_name: The canonical agent name
        
    Returns:
        Acknowledgment message or default if not found
    """
    registry = _load_registry()
    agent_config = registry.get("agents", {}).get(canonical_name, {})
    
    acknowledgment = agent_config.get("acknowledgment")
    if acknowledgment:
        return acknowledgment
    
    # Default acknowledgment
    return f"Starting **{canonical_name}** to handle your request..."


def get_agent_config(canonical_name: str) -> Optional[dict]:
    """
    Get full configuration for an agent.
    
    Args:
        canonical_name: The canonical agent name
        
    Returns:
        Agent configuration dict or None
    """
    registry = _load_registry()
    return registry.get("agents", {}).get(canonical_name)


def list_agents() -> list[str]:
    """
    List all canonical agent names.
    
    Returns:
        List of canonical agent names
    """
    registry = _load_registry()
    return list(registry.get("agents", {}).keys())


def list_all_aliases() -> dict[str, list[str]]:
    """
    List all aliases mapped to their canonical names.
    
    Returns:
        Dict mapping canonical names to their alias lists
    """
    registry = _load_registry()
    return {
        name: config.get("aliases", [])
        for name, config in registry.get("agents", {}).items()
    }


def resolve_with_acknowledgment(name: str) -> tuple[Optional[str], str]:
    """
    Resolve an agent name and get the acknowledgment message in one call.
    
    Args:
        name: Any agent reference (alias, canonical name, or variation)
        
    Returns:
        Tuple of (canonical_name, acknowledgment_message)
        If agent not found, returns (None, "")
    """
    canonical = resolve_agent(name)
    if canonical:
        return canonical, get_acknowledgment(canonical)
    return None, ""


if __name__ == "__main__":
    # Simple CLI for testing
    import sys
    
    if len(sys.argv) < 2:
        print("Usage: python agent_registry.py <command> [args]")
        print("Commands:")
        print("  resolve <name>     - Resolve alias to canonical name")
        print("  detect <text>      - Detect agent from text")
        print("  ack <name>         - Get acknowledgment for agent")
        print("  list               - List all agents")
        sys.exit(1)
    
    command = sys.argv[1]
    
    if command == "resolve" and len(sys.argv) > 2:
        result = resolve_agent(sys.argv[2])
        print(result if result else "Not found")
    elif command == "detect" and len(sys.argv) > 2:
        result = detect_agent(sys.argv[2])
        print(result if result else "No agent detected")
    elif command == "ack" and len(sys.argv) > 2:
        result = get_acknowledgment(sys.argv[2])
        print(result)
    elif command == "list":
        for agent in list_agents():
            print(f"- {agent}")
    else:
        print("Unknown command")
